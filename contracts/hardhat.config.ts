import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
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
};

export default config;
