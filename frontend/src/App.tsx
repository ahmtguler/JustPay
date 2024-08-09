import './App.css'
import SignPayment from './SignPayment/SignPayment'
import { Flex, Space, Card } from "antd";


function App() {
  return (
    <div className='main'>
      <Flex
        className='mainBox'
        vertical={true}
        align='center'
        justify='center'
      >
        <Space
          direction='vertical'
        >
          <w3m-button />
          <Flex
          >
            <Space>

            <Card
              title='Send Token'
              size='small'
              >
              <SignPayment
                receiver={'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
                token={'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'}
                amount={100n}
                chainId={31337}
                name='Transfer'
                />
            </Card>
            <Card
              title='Mint NFT'
              size='small'
              >
              <SignPayment
                receiver={'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
                token={'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'}
                amount={100n}
                chainId={31337}
                name='Transfer'
                />
            </Card>
            <Card
              title='Swap'
              size='small'
              >
              <SignPayment
                receiver={'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
                token={'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'}
                amount={100n}
                chainId={31337}
                name='Transfer'
                />
            </Card>
            <Card
              size='small'
              >
              <SignPayment
                receiver={'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
                token={'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'}
                amount={100n}
                chainId={31337}
                name='Transfer'
                />
            </Card>
                </Space>
          </Flex>
        </Space>
      </Flex>
    </div>
  )
}

export default App
