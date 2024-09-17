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
exports.PaymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("../booking/booking.model");
const AppError_1 = __importDefault(require("../Error/AppError"));
const payment_model_1 = require("./payment.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createPaymentIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Bookings.findById({ _id: id }).populate('user').populate('car');
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking not found");
    }
    return booking;
});
const paymentSuccessDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const payment = yield payment_model_1.Payment.findOne({ transId: id }).session(session);
        if (!payment) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Payment not found");
        }
        payment.date = new Date().toLocaleDateString();
        payment.status = 'Complete';
        yield payment.save({ session });
        const booking = yield booking_model_1.Bookings.findById(payment.bookingId).session(session).populate('car')
            .populate('user');
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
        }
        booking.paid = 'paid';
        yield booking.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return { payment, booking };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Transaction not successful");
    }
});
const paymentCancelDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const payment = yield payment_model_1.Payment.findOne({ transId: id }).session(session);
        if (!payment) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Payment not found");
        }
        payment.status = 'Cancel';
        yield payment.save({ session });
        const booking = yield booking_model_1.Bookings.findById(payment.bookingId)
            .session(session)
            .populate('car')
            .populate('user');
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
        }
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Transaction not successful");
    }
    finally {
        session.endSession();
    }
});
const paymentFailedDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const payment = yield payment_model_1.Payment.findOne({ transId: id }).session(session);
        if (!payment) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Payment not found");
        }
        // Update the payment status to 'Failed'
        payment.status = 'Failed';
        yield payment.save({ session });
        // Find the booking associated with the payment
        const booking = yield booking_model_1.Bookings.findById(payment.bookingId)
            .session(session)
            .populate('car') // Assuming 'car' is a reference to another collection
            .populate('user'); // Assuming 'user' is a reference to another collection
        // Execute the query to populate the fields
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
        }
        // No need to update the booking's payment status since it's failed
        // Commit the transaction
        yield session.commitTransaction();
    }
    catch (error) {
        // Abort the transaction in case of an error
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Transaction not successful");
    }
    finally {
        // End the session
        session.endSession();
    }
});
const getPaymentInfoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findOne({ transId: id })
        .populate({
        path: 'bookingId',
        populate: [
            { path: 'user', model: 'User' },
            { path: 'car', model: 'Car' }
        ]
    })
        .exec();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
    }
    return result;
});
const userPaymentHistoryDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_model_1.Bookings.find({ user: userId }).select('_id');
        const bookingIds = bookings.map(booking => booking._id);
        if (bookingIds.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No booking found");
        }
        // Find all payments associated with the booking IDs
        const payments = yield payment_model_1.Payment.find({ bookingId: { $in: bookingIds } }).populate({
            path: 'bookingId',
            populate: [
                { path: 'user', model: "User" },
                { path: 'car', model: "Car" }
            ]
        }).exec();
        return payments;
    }
    catch (error) {
        throw new Error('Unable to fetch payment history');
    }
});
exports.PaymentService = {
    createPaymentIntoDB,
    paymentSuccessDB,
    paymentCancelDB,
    paymentFailedDB,
    getPaymentInfoDB,
    userPaymentHistoryDB
};
