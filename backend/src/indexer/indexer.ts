import * as chainServices from "../services/chainService";
import * as paymentService from "../services/paymentService";
import JUSTPAY_ABI from "../contants/justpayAbi";
import { JsonRpcProvider, Contract } from "ethers";

const indexer = async () => {
    try {
        await chainServices.initChains();
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }

    while (true) {
        try {
            const chains = await chainServices.getChains();
            if (!chains) {
                console.log("No chains found");
                new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            for (const chain of chains) {
                const lastestBlock = await chainServices.getLatestBlock(chain.chainId) as number;
                const lastIndexedBlock = chain.lastIndexedBlock;
                const blockConfirmations = chain.blockConfirmations;
                if (lastIndexedBlock > lastestBlock - blockConfirmations) {
                    console.log(`Chain ${chain.chainId} is up to date`);
                    continue;
                }
                // Index blocks
                const contract = new Contract(chain.contractAddress, JUSTPAY_ABI, new JsonRpcProvider(chain.rpcUrl));
                const end = lastestBlock - blockConfirmations > 400 ? lastIndexedBlock + 400 : lastestBlock - blockConfirmations;
                const start = lastestBlock < end ? lastestBlock : end - 1;
                
                // Index processed payments
                const processedPaymentEvents = await contract.queryFilter(
                    "PaymentProcessed",
                    start,
                    end
                );
                for (const event of processedPaymentEvents) {
                    const txHash = event.transactionHash;
                    const parsedEvent = contract.interface.parseLog(event);
                    if (!parsedEvent) {
                        continue;
                    }
                    const payment = parsedEvent.args.payment;
                    const paymentId = payment.paymentId.toNumber();
                    const status = 1;
                    await paymentService.updatePayment(paymentId, status, txHash);
                }

                // Index canceled payments
                const canceledPaymentEvents = await contract.queryFilter(
                    "PaymentCanceled",
                    start,
                    end
                );
                for (const event of canceledPaymentEvents) {
                    const txHash = event.transactionHash;
                    const parsedEvent = contract.interface.parseLog(event);
                    if (!parsedEvent) {
                        continue;
                    }
                    const paymentId = parsedEvent.args.paymentId.toNumber();
                    const status = 2;
                    await paymentService.updatePayment(paymentId, status, txHash);
                }

                // Check and mark expired payments
                await paymentService.checkAndUpdateExpiredPayments();

                // Update lastIndexedBlock
                await chainServices.updateChain(chain.chainId, end);
            }
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
        }
        new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
    }
}

export default indexer;