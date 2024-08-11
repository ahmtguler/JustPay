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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = void 0;
const ethers_1 = require("ethers");
const verifySignature = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyingContract = getVerifyingContract(data.chainId);
        if (verifyingContract instanceof Error) {
            return verifyingContract;
        }
        const domain = {
            name: "JustPay",
            version: "1",
            chainId: data.chainId.toString(),
            verifyingContract: verifyingContract,
        };
        const types = {
            Payment: [
                { name: "paymentId", type: "uint256" },
                { name: "sender", type: "address" },
                { name: "receiver", type: "address" },
                { name: "token", type: "address" },
                { name: "amount", type: "uint256" },
                { name: "executor", type: "address" },
                { name: "feeToken", type: "address" },
                { name: "feeAmount", type: "uint256" },
                { name: "chainId", type: "uint256" },
                { name: "deadline", type: "uint256" },
                { name: "salt", type: "uint256" },
            ],
        };
        const payment = {
            paymentId: data.paymentId,
            sender: data.sender,
            receiver: data.receiver,
            token: data.token,
            amount: data.amount,
            executor: data.executor,
            feeToken: data.feeToken,
            feeAmount: data.feeAmount,
            chainId: data.chainId,
            deadline: data.deadline,
            salt: data.salt,
        };
        const signature = data.signature;
        const signer = (0, ethers_1.verifyTypedData)(domain, types, payment, signature);
        const isValid = signer === data.sender;
        return isValid;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.verifySignature = verifySignature;
function getVerifyingContract(chaindId) {
    if (chaindId === 8453) {
        // base mainnet
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    }
    else if (chaindId === 84532) {
        // base testnet
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    }
    else if (chaindId === 1750) {
        // metal l2
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    }
    else {
        return Error("Invalid chainId");
    }
}
exports.default = exports.verifySignature;
