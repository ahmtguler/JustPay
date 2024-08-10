"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chainServices = __importStar(require("../services/chainService"));
const paymentService = __importStar(require("../services/paymentService"));
const justpayAbi_1 = __importDefault(require("../contants/justpayAbi"));
const ethers_1 = require("ethers");
const indexer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chainServices.initChains();
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
    while (true) {
        try {
            const chains = yield chainServices.getChains();
            if (!chains) {
                console.log("No chains found");
                yield new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            for (const chain of chains) {
                const lastestBlock = yield chainServices.getLatestBlock(chain.chainId);
                const lastIndexedBlock = chain.lastIndexedBlock;
                const blockConfirmations = chain.blockConfirmations;
                if (lastIndexedBlock >= lastestBlock - blockConfirmations) {
                    continue;
                }
                // Index blocks
                const contract = new ethers_1.Contract(chain.contractAddress, justpayAbi_1.default, new ethers_1.JsonRpcProvider(chain.rpcUrl));
                const end = lastestBlock - blockConfirmations > 400 ? lastIndexedBlock + 400 : lastestBlock - blockConfirmations;
                const start = lastestBlock < end ? lastestBlock : end - 1;
                // Index processed payments
                const processedPaymentEvents = yield contract.queryFilter("PaymentProcessed", start, end);
                for (const event of processedPaymentEvents) {
                    const txHash = event.transactionHash;
                    const parsedEvent = contract.interface.parseLog(event);
                    console.log('parsedEvent', parsedEvent);
                    if (!parsedEvent) {
                        continue;
                    }
                    const payment = parsedEvent.args.payment;
                    const paymentId = Number(payment[0]);
                    const status = 1;
                    yield paymentService.updatePayment(paymentId, status, txHash);
                }
                // Index canceled payments
                const canceledPaymentEvents = yield contract.queryFilter("PaymentCanceled", start, end);
                for (const event of canceledPaymentEvents) {
                    const txHash = event.transactionHash;
                    const parsedEvent = contract.interface.parseLog(event);
                    if (!parsedEvent) {
                        continue;
                    }
                    const payment = parsedEvent.args.payment;
                    const paymentId = Number(payment[0]);
                    const status = 2;
                    yield paymentService.updatePayment(paymentId, status, txHash);
                }
                // Check and mark expired payments
                yield paymentService.checkAndUpdateExpiredPayments();
                // Update lastIndexedBlock
                yield chainServices.updateChain(chain.chainId, end);
            }
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
        yield new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
    }
});
exports.default = indexer;
