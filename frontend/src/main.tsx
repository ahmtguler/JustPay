import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = '369c53f64a6a4431f17f2b305bfcff0c'

const hardhat = {
  chainId: 31337,
  name: 'Hardhat',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://127.0.0.1:8545/'
}

const ethereum = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://eth.llamarpc.com'
}

const metadata = {
  name: 'justpay',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const ethersConfig = defaultConfig({
  metadata,
})

createWeb3Modal({
  ethersConfig,
  chains: [hardhat, ethereum],
  projectId,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
