import Chain from "../models/chains";
import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const initChains = async () => {
    try {
        const chains = await Chain.find();
        if (chains.length === 0) {
            // Base Sepolia
            const lastIndexedBlock = await getLatestBlock(84532); //todo logic error cannot get latest block without initing chains
            const chain = new Chain({
                chainId: 84532,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //todo: add contract address after deployment
                rpcUrl: process.env.BASE_SEPOLIA_RPC_URL as string,
                lastIndexedBlock: 0,
                blockConfirmations: 0,
            });
            await chain.save();
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
