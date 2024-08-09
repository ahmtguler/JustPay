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

const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://base.blockscout.com',
  rpcUrl: 'https://base-mainnet.public.blastapi.io'
}

const baseSepolia = {
  chainId: 84532,
  name: 'Base Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://base-sepolia.blockscout.com',
  rpcUrl: 'https://base-sepolia-rpc.publicnode.com'
}

const metalL2 = {
  chainId: 1750,
  name: 'Metal L2',
  currency: 'ETH',
  explorerUrl: 'https://explorer.metall2.com',
  rpcUrl: 'https://rpc.metall2.com'
}

const celo = {
  chainId: 42220,
  name: 'Celo',
  currency: 'ETH',
  explorerUrl: 'https://explorer.celo.org/mainnet',
  rpcUrl: 'https://rpc.ankr.com/celo'
}

const mode = {
  chainId: 34443,
  name: 'Mode',
  currency: 'ETH',
  explorerUrl: 'https://modescan.io',
  rpcUrl: 'https://mainnet.mode.network'
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
  chains: [hardhat, base, baseSepolia, metalL2, celo, mode],
  projectId,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
