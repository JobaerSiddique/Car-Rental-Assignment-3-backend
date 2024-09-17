import express from "express";
import { PaymentController } from "./payment.controller";
import { USER_ROLE } from "../users/users.constant";
import Auth from "../../middleware/Auth";




const router = express.Router()

router.post('/create-payment/:id',PaymentController.createPayment)
router.post('/paymentSuccess/:trans_id',PaymentController.paymentSuccess)
router.post('/paymentFailed/:trans_id',PaymentController.paymentFailed)
router.post('/paymentCancel/:trans_id',PaymentController.paymentCancel)
router.get('/paymentInfo/:trans_id',Auth(USER_ROLE.user,USER_ROLE.admin),PaymentController.getPaymentInfo)
router.get('/',Auth(USER_ROLE.user),PaymentController.userPaymentHistory)





export const PaymentRoute = router;