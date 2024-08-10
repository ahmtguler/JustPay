"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
exports.getAllPayments = getAllPayments;
exports.getPendingPayments = getPendingPayments;
exports.getProcessedPayments = getProcessedPayments;
exports.getCanceledPayments = getCanceledPayments;
exports.getExpiredPayments = getExpiredPayments;
exports.getPaymentById = getPaymentById;
exports.getSendPaymentsOfUser = getSendPaymentsOfUser;
exports.getReceivePaymentsOfUser = getReceivePaymentsOfUser;
exports.getPendingPublicPayments = getPendingPublicPayments;
exports.getPendingPrivatePayments = getPendingPrivatePayments;
const paymentService = __importStar(require("../services/paymentService"));
const nullAddress_1 = __importDefault(require("../contants/nullAddress"));
function createPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { paymentId, sender, receiver, token, amount, executor, feeToken, feeAmount, chainId, deadline, salt, signature, } = req.body;
            const payment = yield paymentService.createPayment({
                paymentId,
                sender,
                receiver,
                token,
                amount,
                executor,
                feeToken,
                feeAmount,
                chainId,
                deadline,
                salt,
                signature,
                status: 0,
            });
            if (payment instanceof Error) {
                res.status(400).send(payment.message);
            }
            res.status(201).send(payment);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getAllPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getAllPayments();
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getPendingPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getPendingPayments();
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getProcessedPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getProcessedPayments();
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getCanceledPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getCanceledPayments();
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getExpiredPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getExpiredPayments();
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getPaymentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const paymentId = req.params.paymentId;
            const payment = yield paymentService.getPaymentById(paymentId);
            if (payment) {
                res.status(200).send(payment);
            }
            else {
                res.status(404).send("Payment not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getSendPaymentsOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.params.user;
            const payments = yield paymentService.getSendPaymentsOfUser(user);
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getReceivePaymentsOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.params.user;
            const payments = yield paymentService.getReceivePaymentsOfUser(user);
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getPendingPublicPayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield paymentService.getPendingPaymentsOfexecutor(nullAddress_1.default);
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function getPendingPrivatePayments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const executor = req.params.executor;
            const payments = yield paymentService.getPendingPaymentsOfexecutor(executor);
            if (payments) {
                res.status(200).send(payments);
            }
            else {
                res.status(404).send("Payments not found");
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
