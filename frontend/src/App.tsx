import './App.css'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'
import { randomBytes } from 'ethers'
import NULL_ADDRESS from './utils/nullAddress'
import getDomain from './SignPayment/signPaymentData/Domain'
import types from './SignPayment/signPaymentData/Types'

function App() {
  const { isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function sign() {
    if (!isConnected) throw Error('User disconnected')
    if (!walletProvider) throw Error('Wallet provider not found')

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()

    const salt = randomBytes(32)
    const message = {
      paymentId: 123456,
      sender: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      receiver: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      token: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      amount: 100,
      executor: NULL_ADDRESS,
      feeToken: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      feeAmount: 0,
      chainId: 31337,
      deadline: (Date.now() / 1000).toFixed(0) + 60 * 60,
      salt: salt,
    }
  const domain = getDomain(31337);
    console.log("domain", domain)
    console.log("types", types)
    console.log("message", message)
    // The Contract object
    // const signature = await signer.signMessage("mesage")
    const signature = await signer.signTypedData(domain, types, message)
    console.log("signature", signature)
  }

  return (
    <>
    <button onClick={sign}>Sign</button>
      <w3m-button/>
    </>
  )
}

export default App
