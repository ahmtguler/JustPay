import { Router } from 'express';
import * as paymentController from '../controller/paymentController';

const router = Router();

router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/pending', paymentController.getPendingPayments);
router.get('/payments/pending/public', paymentController.getPendingPublicPayments);
router.get('/payments/pending/private/:executor', paymentController.getPendingPrivatePayments);
router.get('/payments/processed', paymentController.getProcessedPayments);
router.get('/payments/canceled', paymentController.getCanceledPayments);
router.get('/payments/expired', paymentController.getExpiredPayments);
router.get('/payments/:paymentId', paymentController.getPaymentById);
router.get('/payments/send/:user', paymentController.getSendPaymentsOfUser);
router.get('/payments/receive/:user', paymentController.getReceivePaymentsOfUser);

export default router;