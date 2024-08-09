import './App.css'
import NULL_ADDRESS from './utils/constants/nullAddress'
import types from './SignPayment/signPaymentData/Types'
import getDomain from './SignPayment/signPaymentData/Domain'
import { randomBytes } from 'ethers'
import { useWalletClient } from 'wagmi'
import { signTypedData } from 'viem'

async function App() {
  const wallet = useWalletClient();
  const salt = randomBytes(32);
  const message = {
    paymentId: 123456,
    sender: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    recipient: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    token: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    amount: 100,
    executor: NULL_ADDRESS,
    feeToken: NULL_ADDRESS,
    fee: 0,
    chainId: 31337,
    deadline: Date.now() / 1000 + 60 * 60,
    salt: salt,
  }
  const domain = getDomain(31337);

  const signature = await wallet.signTypedData(domain, types, 'Payment', message);
  return (
    <>
    <w3m-button/>
    </>
  )
}

export default App
