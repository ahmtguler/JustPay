import { useSignTypedData } from 'wagmi'
import getDomain from './signPaymentData/Domain'
import types from './signPaymentData/Types'
import NULL_ADDRESS from '../utils/constants/nullAddress'
import { randomBytes } from 'ethers'
 
function SignPayment() {
  const salt = randomBytes(32)
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

  const { data, isError, error, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      message,
      primaryType: 'Payment',
      types,
    })
  console.log('data', data)
  console.log('isError', isError)
  console.log('error', error)
    
  return (
    <div>
      <button onClick={() => signTypedData()}>
        Sign typed data
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  )
}

export default SignPayment