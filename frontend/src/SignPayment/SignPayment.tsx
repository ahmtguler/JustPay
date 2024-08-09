import getDomain from './signPaymentData/Domain'
import types from './signPaymentData/Types'
import NULL_ADDRESS from '../utils/nullAddress'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, parseEther } from 'ethers'
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "antd";
import apiUrl from '../utils/apiUrl'
import axios from 'axios'
import {generateSalt} from '../utils/generateSalt'
import { useState, useEffect } from 'react'
function SignPayment(
  {
    receiver,
    token,
    amount,
    chainId,
    name
  }:{
    receiver: string,
    token: string,
    amount: bigint,
    chainId: number,
    name: string
  }
) {
  const [allowance, setAllowance] = useState(0n)
  const [txHash, setTxHash] = useState('')
  const [status, setStatus] = useState(0)
  const [realPaymentId, setRealPaymentId] = useState(0)
  const { isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const t = performance.now();
  const a = Math.floor(t * 0x100000000) ^ Math.floor(t);
  const rndm = Math.abs(a ^ Math.floor(Math.random() * 0x100000000));
  const salt = generateSalt();
  // const salt = randomBytes(32)
  const domain = getDomain(chainId);

  useEffect(() => {
    allowanceCheck()
    // balanceCheck()
  })

  useEffect(() => {
    if (status !== 1) {
      return;
    }
    if (txHash !== '') {
      return;
    }
    const intervalId = setInterval(() => {
      fetchStatus(realPaymentId)
    }, 1000 * 3)
    return () => clearInterval(intervalId)
  }, [status, realPaymentId, txHash])

  async function allowanceCheck() {
    if (!isConnected) {
      return;
    }
    if (!walletProvider) {
      return;
    }
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const sender = await signer.getAddress()
    const contract = new Contract(token, ['function allowance(address,address) external view returns (uint256)'], signer)
    const allowance = await contract.allowance(sender, domain.verifyingContract);
    setAllowance(allowance)
  }

  // async function balanceCheck() {
  //   if (!isConnected) {
  //     return;
  //   }
  //   if (!walletProvider) {
  //     return;
  //   }
  //   const ethersProvider = new BrowserProvider(walletProvider)
  //   const signer = await ethersProvider.getSigner()
  //   const contract = new Contract(token, ['function balanceOf(address) external view returns (uint256)'], signer)
  //   const address = await signer.getAddress()
  //   const balance = await contract.balanceOf(address)
  // }

  async function approve() {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!walletProvider) {
      toast.error('Please connect your wallet first');
      return;
    }
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new Contract(token, ['function approve(address,uint256) external'], signer)
    const tx = await contract.approve(domain.verifyingContract, parseEther("0.01"));
    await tx.wait()
    toast.success('Approved successfully')
  }

  async function fetchStatus(paymentId: number) {
    console.log('fetchStatus', paymentId)
    await axios.get(`${apiUrl}/payments/${paymentId}`).then((res) => {
      if (res.status === 200) {
        setTxHash(res.data.txHash)
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  

  async function sign() {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!walletProvider) {
      toast.error('Please connect your wallet first');
      return;
    }
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const sender = await signer.getAddress()

    const message = {
      paymentId: rndm,
      sender: sender,
      receiver: receiver,
      token: token,
      amount: amount,
      executor: NULL_ADDRESS,
      feeToken: NULL_ADDRESS,
      feeAmount: 0,
      chainId: chainId,
      deadline: (Date.now() / 1000).toFixed(0) + 60 * 60,
      salt: salt,
    }

    const signature = await signer.signTypedData(domain, types, message)

    await axios.post(`${apiUrl}/payments`, {
      paymentId: message.paymentId,
      sender: sender,
      receiver: message.receiver,
      token: message.token,
      amount: message.amount.toString(),
      executor: message.executor,
      feeToken: message.feeToken,
      feeAmount: message.feeAmount,
      chainId: message.chainId,
      deadline: message.deadline,
      salt: message.salt,
      signature: signature
    }
    ).then((res) => {
      if (res.status === 201) {
        setRealPaymentId(message.paymentId)
        toast.success('Payment signed successfully');
        setStatus(1)
      }
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data);
      }
      console.error(error);
    });
  }
  return (
    <div>
      {
        allowance < amount ?
          <Button onClick={approve}>
            Approve
          </Button>
          :
          <Button onClick={sign}>
            {name}
          </Button>
      }
      
      { 
      
        txHash !== ''?
          <div>
            <p>Transaction Hash: {txHash}</p>
          </div>
          : status === 1 && txHash === '' ?
          <div>
            <p>Processing...</p>
          </div> : null
      }
      {/* <Button onClick={sign}>
        {name}
      </Button> */}
      <Toaster />
    </div>
  )
}

export default SignPayment