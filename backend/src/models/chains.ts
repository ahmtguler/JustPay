import { Schema, model } from "mongoose";

const chainSchema = new Schema({
    chainId: {
        type: Number,
        required: true,
    },
    contractAddress: {
        type: String,
        required: true,
    },
    rpcUrl: {
        type: String,
        required: true,
    },
    lastIndexedBlock: {
        type: Number,
        required: true,
    },
    blockConfirmations: {
        type: Number,
        required: true,
    },
});

export default model("Chain", chainSchema);
