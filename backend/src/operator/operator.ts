import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as paymentService from "../services/paymentService";
import * as chainServices from "../services/chainService";
import JUSTPAY_ABI from "../contants/justpayAbi";
import dotenv from "dotenv";
dotenv.config();

export const operator = async () => {
    let i = 0;
    while (true) {
        try {
            const pendingPayments = await paymentService.getPendingPayments();
            if (!pendingPayments) {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            if (pendingPayments.length === 0) {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            for (const payment of pendingPayments) {
                const chain = await chainServices.getChain(payment.chainId);
                if (!chain) {
                    console.log(`Chain ${payment.chainId} not found`);
                    continue;
                }
                const provider = new JsonRpcProvider(chain.rpcUrl);
                const wallet = new Wallet(process.env.OPERATOR_PRIVATE_KEY as string, provider);
                const contract = new Contract(chain.contractAddress, JUSTPAY_ABI, wallet);
                const paymentTupple = {
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
                const feeReceiver = process.env.FEE_RECEIVER as string;
                try {
                    await contract.processPayment(
                        paymentTupple,
                        signature,
                        feeReceiver
                    );
                    console.log(`Payment ${payment.paymentId} processed`);
                } catch (error: any) {
                    console.error(`Error: ${error.message}`);
                    continue;
                }
            }
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
        }
    }
};

export default operator;