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
exports.operator = void 0;
const ethers_1 = require("ethers");
const paymentService = __importStar(require("../services/paymentService"));
const chainServices = __importStar(require("../services/chainService"));
const justpayAbi_1 = __importDefault(require("../contants/justpayAbi"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const operator = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    while (true) {
        try {
            const pendingPayments = yield paymentService.getPendingPayments();
            if (!pendingPayments) {
                yield new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            if (pendingPayments.length === 0) {
                yield new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            for (const payment of pendingPayments) {
                const chain = yield chainServices.getChain(payment.chainId);
                if (!chain) {
                    console.log(`Chain ${payment.chainId} not found`);
                    continue;
                }
                const provider = new ethers_1.JsonRpcProvider(chain.rpcUrl);
                const wallet = new ethers_1.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);
                const contract = new ethers_1.Contract(chain.contractAddress, justpayAbi_1.default, wallet);
                const paymentStruct = {
                    paymentId: payment.paymentId,
                    sender: payment.sender,
                    receiver: payment.receiver,
                    token: payment.token,
                    amount: payment.amount,
                    executor: payment.executor,
                    feeToken: payment.feeToken,
                    feeAmount: payment.feeAmount,
                    chainId: payment.chainId,
                    deadline: payment.deadline,
                    salt: payment.salt,
                };
                const signature = payment.signature;
                const feeReceiver = process.env.FEE_RECEIVER;
                console.log(`Processing payment ${payment.paymentId}...`);
                // const ERC20Contract = new Contract(payment.token, 
                //     [
                //         'function balanceOf(address) external view returns (uint256)',
                //         'function allowance(address, address) external view returns (uint256)'
                //     ], wallet);
                // const balance = await ERC20Contract.balanceOf(payment.sender);
                // const allwance = await ERC20Contract.allowance(payment.sender, chain.contractAddress);
                try {
                    const tx = yield contract.processPayment(paymentStruct, signature, feeReceiver);
                    console.log(`Payment ${payment.paymentId} processed`);
                    // if (!tx.hash) {
                    //     console.error("Transaction hash not found");
                    //     continue;
                    // }
                    yield paymentService.updatePayment(payment.paymentId, 4, tx.hash);
                }
                catch (error) {
                    console.error(`Error: ${error.message}`);
                    continue;
                }
                yield new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
            }
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
});
exports.operator = operator;
exports.default = exports.operator;
