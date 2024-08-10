"use strict";
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
exports.getPendingPaymentsOfexecutor = exports.getReceivePaymentsOfUser = exports.getSendPaymentsOfUser = exports.getPaymentById = exports.getExpiredPayments = exports.getCanceledPayments = exports.getProcessedPayments = exports.getPendingPayments = exports.getAllPayments = exports.checkAndUpdateExpiredPayments = exports.updatePayment = exports.createPayment = void 0;
const payment_1 = __importDefault(require("../models/payment"));
const verifySignature_1 = __importDefault(require("../utils/verifySignature"));
const createPayment = (payment) => __awaiter(void 0, void 0, void 0, function* () {
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
            txHash: "",
        };
        const isValid = yield (0, verifySignature_1.default)(data);
        if (!isValid) {
            return Error("Invalid signature");
        }
        const newPayment = new payment_1.default(payment);
        yield newPayment.save();
        return newPayment;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.createPayment = createPayment;
const updatePayment = (paymentId, status, txHash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { paymentId: paymentId };
        let update;
        if (txHash) {
            update = { status: status, txHash: txHash };
        }
        else {
            update = { status: status };
        }
        yield payment_1.default.findOneAndUpdate(filter, update);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.updatePayment = updatePayment;
const checkAndUpdateExpiredPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 0, deadline: { $lt: Date.now() / 1000 } };
        const update = { status: 3 };
        yield payment_1.default.updateMany(filter, update);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.checkAndUpdateExpiredPayments = checkAndUpdateExpiredPayments;
const getAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_1.default.find();
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getAllPayments = getAllPayments;
const getPendingPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 0 };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getPendingPayments = getPendingPayments;
const getProcessedPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 1 };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getProcessedPayments = getProcessedPayments;
const getCanceledPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 2 };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getCanceledPayments = getCanceledPayments;
const getExpiredPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 3 };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getExpiredPayments = getExpiredPayments;
const getPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { paymentId: paymentId };
        const payment = yield payment_1.default.findOne(filter);
        return payment;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getPaymentById = getPaymentById;
const getSendPaymentsOfUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { sender: user };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getSendPaymentsOfUser = getSendPaymentsOfUser;
const getReceivePaymentsOfUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { receiver: user };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getReceivePaymentsOfUser = getReceivePaymentsOfUser;
const getPendingPaymentsOfexecutor = (executor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { status: 0, executor: executor };
        const payments = yield payment_1.default.find(filter);
        return payments;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
exports.getPendingPaymentsOfexecutor = getPendingPaymentsOfexecutor;
