import { TypedDataDomain, TypedDataField, verifyTypedData } from "ethers";

export const verifySignature = async (
    data: {
        paymentId: number;
        sender: string;
        receiver: string;
        token: string;
        amount: string;
        executor: string;
        feeToken: string;
        feeAmount: string;
        chainId: number;
        deadline: number;
        salt: string;
        signature: string;
    }
) => {
    try {
        const verifyingContract = getVerifyingContract(data.chainId);
        const domain: TypedDataDomain = {
            name: "JustPay",
            version: "1",
            chainId: data.chainId.toString(),
            verifyingContract: verifyingContract,
        };
        const types: Record<string, TypedDataField[]> = {
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
                { name: "salt", type: "bytes32" },
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
        const signer = verifyTypedData(domain, types, payment, signature);
        const isValid = signer === data.sender;
        
        return isValid;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

function getVerifyingContract(chaindId: number) {
    if (chaindId === 84532) { 
        // Base Sepolia
        return "0x0000000000000000000000000000000000000000"; //todo add the address of the contract after deployment
    } else {
        throw new Error("Invalid chainId");
    }
}

export default verifySignature;