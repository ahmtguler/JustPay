import getDomain from './signPaymentData/Domain'
import types from './signPaymentData/Types'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, parseEther } from 'ethers'
import toast, { Toaster } from 'react-hot-toast';
import { Button, Input, Space, Typography } from "antd";
import apiUrl from '../utils/apiUrl'
import axios from 'axios'
import { generateSalt } from '../utils/generateSalt'
import { useState, useEffect } from 'react'
function SignPayment(
  {
    token,
    name
  }: {
    token: string,
    name: string
  }
) {
  const { Text, Link } = Typography;

  const [allowance, setAllowance] = useState(0n)
  const [receiver, setReceiver] = useState('')
  const [txHash, setTxHash] = useState('')
  const [status, setStatus] = useState(0)
  const [realPaymentId, setRealPaymentId] = useState(0)

  const { isConnected, chainId } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const t = performance.now();
  const a = Math.floor(t * 0x100000000) ^ Math.floor(t);
  const rndm = Math.abs(a ^ Math.floor(Math.random() * 0x100000000));
  const salt = generateSalt();
  const domain = getDomain(chainId); // invalid chainId error
  const explorer = domain.chainId === 8453 ? 'https://base.blockscout.com/tx/' : domain.chainId === 84532 ? 'https://base-sepolia.blockscout.com/tx/' : ""

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
    const tx = await contract.approve(domain.verifyingContract, parseEther("0.0001"));
    await tx.wait()
    toast.success('Approved successfully')
  }

  async function fetchStatus(paymentId: number) {
    console.log('fetchStatus', paymentId)
    await axios.get(`${apiUrl}/payments/${paymentId}`).then((res) => {
      if (res.status === 200) {
        if (res.data.txHash === undefined || res.data.txHash === '') {
          return;
        }
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
    if (receiver === '') {
      toast.error('Please enter receiver address');
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
      amount: parseEther("0.00001"),
      executor: "0x19070B35190Ed46588baeD8da833D95552AB61A2",
      feeToken: "0x4200000000000000000000000000000000000006",
      feeAmount: parseEther("0.0000003"),
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
      feeAmount: message.feeAmount.toString(),
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
      <Space
        direction='vertical'
      >
        <Text type='danger'>0.0000003 WETH will be charged as fee to protect against spam</Text>
        <Input
          placeholder="Receiver"
          style={{ width: 474 }}
          onChange={(e) => setReceiver(e.target.value)}
        />
        {
          allowance < parseEther("0.00002") ?
            <Button
              onClick={approve}
              style={{ width: 474 }}
            >
              Approve
            </Button>
            :
            <Button
              onClick={sign}
              style={{ width: 474 }}
            >
              {name}
            </Button>
        }

        {
          txHash !== '' ?
            <div>
              <Link href={`${explorer
                }${txHash
                }`} target="_blank">
                View Transaction
              </Link>
            </div>
            : status === 1 && txHash === '' ?
              <div>
                <p>Processing...</p>
              </div> : null
        }
      </Space>
      <Toaster />
    </div>
  )
}

export default SignPayment