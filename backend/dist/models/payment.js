"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    paymentId: {
        type: Number,
        required: true,
        unique: true,
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    executor: {
        type: String,
        required: true,
    },
    feeToken: {
        type: String,
        required: true,
    },
    feeAmount: {
        type: String,
        required: true,
    },
    chainId: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Number,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
        required: true,
    },
    status: {
        type: Number, // 0: pending, 1: processed, 2: cancelled, 3: expired 4: to be indexed
        required: true,
    },
    txHash: {
        type: String,
    },
});
const Payment = (0, mongoose_1.model)("Payment", paymentSchema);
exports.default = Payment;
