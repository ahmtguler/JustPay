import Chain from "../models/chains";
import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const initChains = async () => {
    try {
        const chains = await Chain.find();
        if (chains.length === 0) {
            console.log("Initializing chains...");
            // Base Mainnet
            const baseMainnet = new Chain({
                chainId: 8453,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.BASE_MAINNET_RPC_URL as string,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving baseMainnet chain...");
            await baseMainnet.save();

            // Base Sepolia
            const baseTestnet = new Chain({
                chainId: 84532,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.BASE_TESTNET_RPC_URL as string,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving baseTestnet chain...");
            await baseTestnet.save();

            // Metal L2
            const metalL2 = new Chain({
                chainId: 1750,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.METAL_L2_RPC_URL as string,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving metalL2 chain...");
            await metalL2.save();
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
