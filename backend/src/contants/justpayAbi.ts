const JUSTPAY_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "paymentId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "executor",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "feeToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "feeAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "salt",
                        type: "bytes32",
                    },
                ],
                indexed: false,
                internalType: "struct LibPayment.Payment",
                name: "payment",
                type: "tuple",
            },
        ],
        name: "PaymentCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "paymentId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "token",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "executor",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "feeToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "feeAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "salt",
                        type: "bytes32",
                    },
                ],
                indexed: false,
                internalType: "struct LibPayment.Payment",
                name: "payment",
                type: "tuple",
            },
        ],
        name: "PaymentProcessed",
        type: "event",
    },
];

export default JUSTPAY_ABI;
