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
        <Flex
          justify='center'
          align='center'
          vertical={true}
        >

          <w3m-button/>
          <br />
            <Space>
            <Card
              title='Send 0.00001 WETH'
              size='small'
              style={{ width: 500 }}
              >
              <SignPayment
                token={'0x4200000000000000000000000000000000000006'}
                name='Transfer WETH'
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
