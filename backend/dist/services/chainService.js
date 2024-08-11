"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChain = exports.getChains = exports.getChain = exports.getLatestBlock = exports.initChains = void 0;
const chains_1 = __importDefault(require("../models/chains"));
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initChains = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chains = yield chains_1.default.find();
        if (chains.length === 0) {
            console.log("Initializing chains...");
            // Base Mainnet
            const baseMainnet = new chains_1.default({
                chainId: 8453,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.BASE_MAINNET_RPC_URL,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving baseMainnet chain...");
            yield baseMainnet.save();
            // Base Sepolia
            const baseTestnet = new chains_1.default({
                chainId: 84532,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.BASE_TESTNET_RPC_URL,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving baseTestnet chain...");
            yield baseTestnet.save();
            // Metal L2
            const metalL2 = new chains_1.default({
                chainId: 1750,
                contractAddress: "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0",
                rpcUrl: process.env.METAL_L2_RPC_URL,
                lastIndexedBlock: 0, //deprecated, indexer is not running for this prototype anymore
                blockConfirmations: 0,
            });
            console.log("Saving metalL2 chain...");
            yield metalL2.save();
            console.log("Chains saved");
        }
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.initChains = initChains;
const getLatestBlock = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chain = yield chains_1.default.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        const provider = new ethers_1.JsonRpcProvider(chain.rpcUrl);
        const blockNumber = yield provider.getBlockNumber();
        return blockNumber;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getLatestBlock = getLatestBlock;
const getChain = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chain = yield chains_1.default.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        return chain;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getChain = getChain;
const getChains = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chains = yield chains_1.default.find();
        return chains;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getChains = getChains;
const updateChain = (chainId, lastIndexedBlock) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chain = yield chains_1.default.findOne({ chainId: chainId });
        if (!chain) {
            throw new Error("Chain not found");
        }
        chain.lastIndexedBlock = lastIndexedBlock;
        yield chain.save();
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.updateChain = updateChain;
