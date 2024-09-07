import express from "express";
import { PaymentController } from "./payment.controller";




const router = express.Router()

router.post('/create-payment/:id',PaymentController.createPayment)
router.post('/paymentSuccess/:trans_id',PaymentController.paymentSuccess)
router.post('/paymentFailed/:trans_id',PaymentController.paymentFailed)
router.post('/paymentCancel/:trans_id',PaymentController.paymentCancel)
router.get('/paymentInfo/:trans_id',PaymentController.getPaymentInfo)





export const PaymentRoute = router;