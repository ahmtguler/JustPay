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
  const { isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const t = performance.now();
  const a = Math.floor(t * 0x100000000) ^ Math.floor(t);
  const rndm = Math.abs(a ^ Math.floor(Math.random() * 0x100000000));
  const salt = generateSalt();
  // const salt = randomBytes(32)

  useEffect(() => {
    allowanceCheck()
  })

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
    const allowance = await contract.allowance(sender, receiver)
    setAllowance(allowance)
  }

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
    const tx = await contract.approve(receiver, parseEther("0.01"));
    await tx.wait()
    toast.success('Approved successfully')
  }
  
  const domain = getDomain(chainId);

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
        toast.success('Payment signed successfully');
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
      {/* <Button onClick={sign}>
        {name}
      </Button> */}
      <Toaster />
    </div>
  )
}

export default SignPayment