import Payment from "../models/payment";
import verifySignature from "../utils/verifySignature";

export const createPayment = async (
    payment: {
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
        status: number;
    }
) => {
    try {
        const data = {
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
            signature: payment.signature,
        };
        const isValid = await verifySignature(data);
        if (!isValid) {
            throw new Error("Invalid signature");
        }
        const newPayment = new Payment(payment);
        await newPayment.save();
        return newPayment;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const updatePayment = async (
    paymentId: number,
    status: number,
    txHash?: string
) => {
    try {
        const filter = { paymentId: paymentId };
        let update;
        if (txHash) {
            update = { status: status, txHash: txHash };
        } else {
            update = { status: status };
        }
        await Payment.findOneAndUpdate(filter, update);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const checkAndUpdateExpiredPayments = async () => {
    try {
        const filter = { status: 0, deadline: { $lt: Date.now() / 1000 } };
        const update = { status: 3 };
        await Payment.updateMany(filter, update);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const getAllPayments = async () => {
    try {
        const payments = await Payment.find();
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getPendingPayments = async () => {
    try {
        const filter = { status: 0 };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getProcessedPayments = async () => {
    try {
        const filter = { status: 1 };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getCanceledPayments = async () => {
    try {
        const filter = { status: 2 };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getExpiredPayments = async () => {
    try {
        const filter = { status: 3 };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export const getPaymentById = async (paymentId: string) => {
    try {
        const filter = { paymentId: paymentId };
        const payment = await Payment.findOne(filter);
        return payment;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const getSendPaymentsOfUser = async (user: string) => {
    try {
        const filter = { sender: user };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const getReceivePaymentsOfUser = async (user: string) => {
    try {
        const filter = { receiver: user };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export const getPendingPaymentsOfexecutor = async (executor: string) => {
    try {
        const filter = { status: 0, executor: executor };
        const payments = await Payment.find(filter);
        return payments;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}
