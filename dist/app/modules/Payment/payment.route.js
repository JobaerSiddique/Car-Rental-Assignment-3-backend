"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const users_constant_1 = require("../users/users.constant");
const Auth_1 = __importDefault(require("../../middleware/Auth"));
const router = express_1.default.Router();
router.post('/create-payment/:id', payment_controller_1.PaymentController.createPayment);
router.post('/paymentSuccess/:trans_id', payment_controller_1.PaymentController.paymentSuccess);
router.post('/paymentFailed/:trans_id', payment_controller_1.PaymentController.paymentFailed);
router.post('/paymentCancel/:trans_id', payment_controller_1.PaymentController.paymentCancel);
router.get('/paymentInfo/:trans_id', (0, Auth_1.default)(users_constant_1.USER_ROLE.user, users_constant_1.USER_ROLE.admin), payment_controller_1.PaymentController.getPaymentInfo);
router.get('/', (0, Auth_1.default)(users_constant_1.USER_ROLE.user), payment_controller_1.PaymentController.userPaymentHistory);
exports.PaymentRoute = router;
