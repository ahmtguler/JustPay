import domain from "./utils/Domain";
import types from "./utils/Types";
import { randomBytes } from 'ethers'
import { Signer } from "ethers";
import NULL_ADDRESS from "../constants/nullAddress";

function signPayment(
    paymentId: number,
    sender: string,
    receiver: string,
    token: string,
    amount: string,
    feeToken: string,
    feeAmount: string,
    chainId: number,
    signer: Signer
) {
    const domainData = domain(chainId);
    const salt = randomBytes(32);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const payment = {
        paymentId,
        sender,
        receiver,
        token,
        amount,
        executer: NULL_ADDRESS,
        feeToken,
        feeAmount,
        chainId,
        deadline,
        salt,
    };
    return signer.signTypedData(domainData, types, payment);
}

export default signPayment;
