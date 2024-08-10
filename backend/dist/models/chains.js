"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chainSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Chain", chainSchema);
