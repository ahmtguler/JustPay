import Chain from "../models/chains";
import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const initChains = async () => {
    try {
        const chains = await Chain.find();
        if (chains.length === 0) {
            // Base Sepolia
            // const lastIndexedBlock = await getLatestBlock(84532); //todo logic error cannot get latest block without initing chains
            console.log("Initializing chains...");

            const hardhat = new Chain({
                chainId: 31337,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
                rpcUrl: process.env.LOCAL_RPC_URL as string,
                lastIndexedBlock: 0, //todo: change to lastIndexedBlock
                blockConfirmations: 0,
            });
            console.log("Saving hardhat chain...");
            await hardhat.save();

            // // Base Mainnet
            // const baseMainnet = new Chain({
            //     chainId: 8453,
            //     contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
            //     rpcUrl: process.env.BASE_MAINNET_RPC_URL as string,
            //     lastIndexedBlock: 0, //todo: change to lastIndexedBlock
            //     blockConfirmations: 0,
            // });
            // console.log("Saving baseMainnet chain...");
            // await baseMainnet.save();


            // // Base Testnet
            // const baseTestnet = new Chain({
            //     chainId: 84532,
            //     contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
            //     rpcUrl: process.env.BASE_TESTNET_RPC_URL as string,
            //     lastIndexedBlock: 0, //todo: change to lastIndexedBlock
            //     blockConfirmations: 0,
            // });
            // console.log("Saving baseTestnet chain...");
            // await baseTestnet.save();

            // // Metal L2
            // const metalL2 = new Chain({
            //     chainId: 1750,
            //     contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
            //     rpcUrl: process.env.METAL_L2_RPC_URL as string,
            //     lastIndexedBlock: 0, //todo: change to lastIndexedBlock
            //     blockConfirmations: 0,
            // });
            // console.log("Saving metalL2 chain...");
            // await metalL2.save();

            // // Celo
            // const celo = new Chain({
            //     chainId: 42220,
            //     contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
            //     rpcUrl: process.env.CELO_RPC_URL as string,
            //     lastIndexedBlock: 0, //todo: change to lastIndexedBlock
            //     blockConfirmations: 0,
            // });
            // console.log("Saving celo chain...");
            // await celo.save();

            // // Mode
            // const mode = new Chain({
            //     chainId: 34443,
            //     contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
            //     rpcUrl: process.env.MODE_RPC_URL as string,
            //     lastIndexedBlock: 0, //todo: change to lastIndexedBlock
            //     blockConfirmations: 0,
            // });
            // console.log("Saving mode chain...");
            // await mode.save();

            console.log("Chains saved");
        }
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getLatestBlock = async (chainId: number) => {
    try {
        const chain = await Chain.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        const provider = new JsonRpcProvider(chain.rpcUrl);
        const blockNumber = await provider.getBlockNumber();
        return blockNumber;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getChain = async (chainId: number) => {
    try {
        const chain = await Chain.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        return chain;
    }
    catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getChains = async () => {
    try {
        const chains = await Chain.find();
        return chains;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const updateChain = async (chainId: number, lastIndexedBlock: number) => {
    try {
        const chain = await Chain.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        chain.lastIndexedBlock = lastIndexedBlock;
        await chain.save();
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}
