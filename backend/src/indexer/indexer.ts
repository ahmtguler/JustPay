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
                await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
                continue;
            }
            for (const chain of chains) {
                const lastestBlock = await chainServices.getLatestBlock(chain.chainId) as number;
                const lastIndexedBlock = chain.lastIndexedBlock;
                const blockConfirmations = chain.blockConfirmations;
                if (lastIndexedBlock >= lastestBlock - blockConfirmations) {
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
                    console.log('parsedEvent', parsedEvent);
                    if (!parsedEvent) {
                        continue;
                    }
                    const payment = parsedEvent.args.payment;
                    const paymentId = Number(payment[0]);
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
                    const payment = parsedEvent.args.payment;
                    const paymentId = Number(payment[0]);
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
        await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
    }
}

export default indexer;