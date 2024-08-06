import { TypedDataField } from "ethers";

const types: Record<string, TypedDataField[]> = {
    Payment: [
        { name: "paymentId", type: "uint256" },
        { name: "sender", type: "address" },
        { name: "receiver", type: "address" },
        { name: "token", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "executer", type: "address" },
        { name: "feeToken", type: "address" },
        { name: "feeAmount", type: "uint256" },
        { name: "chainId", type: "uint256" },
        { name: "deadline", type: "uint256" },
        { name: "salt", type: "bytes32" },
    ],
};

export default types;