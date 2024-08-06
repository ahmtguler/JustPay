import React from "react";
import { Card, Button } from "antd";
import { Signer } from "ethers";
import signPayment from "../utils/SignPayment/SignPayment";

const App: React.FC<{
    title: string,
    content: string,
    paymentData: {
        paymentId: number,
        sender: string,
        receiver: string,
        token: string,
        amount: string,
        feeToken: string,
        feeAmount: string,
        chainId: number,
        signer: Signer
    }
}> = (
    { title, content, paymentData }
) => (
    <Card title={title}>
        <p>{content}</p>
        
        <Button
            onClick={() => {
                signPayment(
                    paymentData.paymentId,
                    paymentData.sender,
                    paymentData.receiver,
                    paymentData.token,
                    paymentData.amount,
                    paymentData.feeToken,
                    paymentData.feeAmount,
                    paymentData.chainId,
                    paymentData.signer
                );
            }}
        >
            Sign Payment
        </Button>


    </Card>
);

export default App;
