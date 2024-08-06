import Card from './components/Card'
import './App.css'

function App() {
  return (
    <>
      <Card 
        title="Card Title"
        content="Card Content"
        paymentData={{
          paymentId: '123456',
        }}
        ></Card>


      <w3m-button />
    </>
  )
}

export default App
