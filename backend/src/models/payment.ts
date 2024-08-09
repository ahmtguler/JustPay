import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
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
        type: Number, // 0: pending, 1: processed, 2: cancelled, 3: expired
        required: true,
    },
    txHash: {
        type: String,
    },
});

const Payment = model("Payment", paymentSchema);

export default Payment;
