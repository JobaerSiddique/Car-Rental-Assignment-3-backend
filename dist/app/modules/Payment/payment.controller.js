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
exports.PaymentController = void 0;
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../utilis/catchAsync"));
const payment_services_1 = require("./payment.services");
const payment_utils_1 = require("./payment.utils");
const payment_model_1 = require("./payment.model");
const sendResponse_1 = __importDefault(require("../../utilis/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const store_id = config_1.default.store_Id;
const store_passwd = config_1.default.store_pass;
const is_live = false; // Set to true for production
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield payment_services_1.PaymentService.createPaymentIntoDB(id);
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const trans_id = (0, payment_utils_1.generateTransId)();
        const data = {
            total_amount: result.totalCost,
            currency: 'BDT',
            tran_id: trans_id, // Unique transaction ID
            success_url: `http://localhost:5000/api/payment/paymentSuccess/${trans_id}`,
            fail_url: `http://localhost:5000/api/payment/paymentFailed/${trans_id}`,
            cancel_url: `http://localhost:5000/api/payment/paymentCancel/${trans_id}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: result.car.name,
            product_category: result.car.types,
            product_profile: 'general',
            cus_name: result.user.name,
            cus_email: result.user.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: result.user.phone,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const apiResponse = yield sslcz.init(data);
        if (apiResponse && apiResponse.GatewayPageURL) {
            // Save the payment details in the database
            const payment = new payment_model_1.Payment({
                bookingId: result._id,
                totalCost: result.totalCost,
                transId: trans_id,
                status: 'Pending',
            });
            result.paid = 'unpaid';
            yield result.save({ session });
            try {
                yield payment.save({ session });
            }
            catch (saveError) {
                console.error("Error saving payment:", saveError);
                throw new Error('Failed to save payment to the database');
            }
            // Commit the transaction
            yield session.commitTransaction();
            session.endSession();
            // console.log(data);
            // Redirect to the SSLCommerz payment gateway
            res.send({ url: apiResponse.GatewayPageURL });
            console.log(apiResponse.GatewayPageURL);
        }
        else {
            throw new Error('Failed to generate payment gateway URL');
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
}));
const userPaymentHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield payment_services_1.PaymentService.userPaymentHistoryDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payment History retrieved successfully",
        data: result,
    });
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trans_id } = req.params;
    const result = yield payment_services_1.PaymentService.paymentSuccessDB(trans_id);
    res.redirect(`http://localhost:5173/dashboard/payment/success/${trans_id}`);
}));
const paymentCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trans_id } = req.params;
    const result = yield payment_services_1.PaymentService.paymentCancelDB(trans_id);
    res.redirect(`http://localhost:5173/dashboard/payment/cancel/${trans_id}`);
}));
const paymentFailed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trans_id } = req.params;
    const result = yield payment_services_1.PaymentService.paymentFailedDB(trans_id);
    res.redirect(`http://localhost:5173/dashboard/payment/failed/${trans_id}`);
}));
const getPaymentInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trans_id } = req.params;
    const result = yield payment_services_1.PaymentService.getPaymentInfoDB(trans_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payment Info",
        data: result,
    });
}));
exports.PaymentController = {
    createPayment,
    paymentSuccess,
    paymentCancel,
    paymentFailed,
    getPaymentInfo,
    userPaymentHistory
};
