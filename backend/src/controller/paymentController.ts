import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";
import NULL_ADDRESS from "../utils/nullAddress";

export async function createPayment(req: Request, res: Response) {
    try {
        const {
            paymentId,
            sender,
            receiver,
            token,
            amount,
            executer,
            feeToken,
            feeAmount,
            chainId,
            deadline,
            salt,
            signature,
        } = req.body;
        const payment = await paymentService.createPayment({
            paymentId,
            sender,
            receiver,
            token,
            amount,
            executer,
            feeToken,
            feeAmount,
            chainId,
            deadline,
            salt,
            signature,
            status: 0,
        });
        res.status(201).send(payment);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getAllPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getAllPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getPendingPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getPendingPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getProcessedPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getProcessedPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getCanceledPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getCanceledPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getExpiredPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getExpiredPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getPaymentById(req: Request, res: Response) {
    try {
        const paymentId = req.params.paymentId;
        const payment = await paymentService.getPaymentById(paymentId);
        if (payment) {
            res.status(200).send(payment);
        } else {
            res.status(404).send("Payment not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getSendPaymentsOfUser(req: Request, res: Response) {
    try {
        const user = req.params.user;
        const payments = await paymentService.getSendPaymentsOfUser(user);
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getReceivePaymentsOfUser(req: Request, res: Response) {
    try {
        const user = req.params.user;
        const payments = await paymentService.getReceivePaymentsOfUser(user);
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getPendingPublicPayments(req: Request, res: Response) {
    try {
        const payments = await paymentService.getPendingPaymentsOfExecuter(NULL_ADDRESS);
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getPendingPrivatePayments(req: Request, res: Response) {
try {
        const executer = req.params.executer;
        const payments = await paymentService.getPendingPaymentsOfExecuter(executer);
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send("Payments not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}
