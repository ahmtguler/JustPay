import Chain from "../models/chains";
import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const initChains = async () => {
    try {
        const chains = await Chain.find();
        if (chains.length === 0) {
            // Base Sepolia
            const lastIndexedBlock = await getLatestBlock(84532);
            const chain = new Chain({
                chainId: 84532,
                contractAddress: "", //todo: add contract address after deployment
                rpcUrl: process.env.BASE_SEPOLIA_RPC_URL as string,
                lastIndexedBlock: lastIndexedBlock,
                blockConfirmations: 3,
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
