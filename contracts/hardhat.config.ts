import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    base: {
      url: "https://base-mainnet.public.blastapi.io",
      accounts: [
        process.env.PV_KEY as string,
      ],
    },
    metalL2: {
      url: "https://rpc.metall2.com",
      accounts: [
        process.env.PV_KEY as string,
      ],
    },
    celo: {
      url: "https://rpc.ankr.com/celo",
      accounts: [
        process.env.PV_KEY as string,
      ],
    },
    mode: {
      url: "https://mainnet.mode.network",
      accounts: [
        process.env.PV_KEY as string,
      ],
    },
    baseSepolia: {
      url: "https://base-sepolia-rpc.publicnode.com",
      accounts: [
        process.env.PV_KEY as string,
      ],
    },
  },
  etherscan: {
    apiKey: {
      base: process.env.ETHERSCAN_API_KEY as string,
      metalL2: process.env.ETHERSCAN_API_KEY as string,
      celo: process.env.ETHERSCAN_API_KEY as string,
      mode: process.env.ETHERSCAN_API_KEY as string,
      baseSepolia: "abc",
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://base.blockscout.com/api",
          browserURL: "https://base.blockscout.com/",
        }
      },
      {
        network: "metalL2",
        chainId: 1750,
        urls: {
          apiURL: "https://explorer.metall2.com/api",
          browserURL: "https://explorer.metall2.com/",
        }
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://explorer.celo.org/mainnet/api",
          browserURL: "https://explorer.celo.org/mainnet/",
        }
      },
      {
        network: "mode",
        chainId: 34443,
        urls: {
          apiURL: "https://modescan.io/api",
          browserURL: "https://modescan.io/",
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/",
        }
      },
    ]
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
