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
exports.BookingService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const booking_model_1 = require("./booking.model");
const cars_model_1 = require("../cars/cars.model");
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const createBookingIntoDB = (userId, carId, startTime, nid, passport, drivingLicense, date) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(date, drivingLicense);
    const carFind = yield cars_model_1.Cars.findById(carId);
    if (!carFind) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "There is  no car found");
    }
    if (carFind.status !== "available") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Car is Not available");
    }
    if (carFind.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is no longer available");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBooking = new booking_model_1.Bookings({
            user: userId,
            car: carId,
            date: date,
            startTime: startTime,
            endTime: null,
            totalCost: 0,
            nid: nid,
            passport: passport,
            drivingLicense: drivingLicense
        });
        console.log({ newBooking });
        carFind.status = "unavailable";
        yield carFind.save();
        yield newBooking.save();
        yield session.commitTransaction();
        yield session.endSession();
        return newBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const UserBookingInfoFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserBooking = yield booking_model_1.Bookings.find({ user: id }).populate('user').populate('car');
    return findUserBooking;
});
const getAllBookingFromDB = (carId, date, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (carId || date) {
        query.car = carId;
        query.date = date;
    }
    const skip = (page - 1) * limit;
    const result = yield booking_model_1.Bookings.find(query).populate('user').populate('car').skip(skip).limit(limit);
    console.log(result);
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Booking Found");
    }
    const total = yield booking_model_1.Bookings.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    return { result, totalPages, };
});
const approveCarFromDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(bookingId, {
        approve: true
    });
    return result;
});
const deleteBookingsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log({ id });
    const userBooking = yield booking_model_1.Bookings.findById(id);
    if (userBooking.approve === true) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking can not delete already approved Bookings");
    }
    const car = yield cars_model_1.Cars.findById((_a = userBooking === null || userBooking === void 0 ? void 0 : userBooking.car) === null || _a === void 0 ? void 0 : _a._id);
    if (!car) {
        throw new app.Error(http_status_1.default.BAD_REQUEST, "No car found");
    }
    if (userBooking === null || userBooking === void 0 ? void 0 : userBooking.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking can not delete already deleted Bookings");
    }
    car === null || car === void 0 ? void 0 : car.status = "available";
    yield (car === null || car === void 0 ? void 0 : car.save());
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(id, { isDeleted: true });
    return result;
});
const getSingleBookingDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Bookings.findById({ _id: id }).populate('user').populate('car');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not Found");
    }
    return result;
});
const getBookingSummaryDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const totalBookings = yield booking_model_1.Bookings.countDocuments();
    const availableCars = yield cars_model_1.Cars.countDocuments({ status: 'available' });
    const totalRevenue = yield booking_model_1.Bookings.aggregate([
        {
            $match: {
                paid: 'paid',
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalCost" },
            },
        },
    ]);
    return {
        totalBookings,
        availableCars,
        totalRevenue: ((_b = totalRevenue[0]) === null || _b === void 0 ? void 0 : _b.totalRevenue) || 0,
    };
});
const updateBookingInfoDB = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Bookings.findById(bookingId);
    if (bookings.isDeleted || (bookings === null || bookings === void 0 ? void 0 : bookings.approve)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking can not update already approved or deleted Bookings");
    }
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(bookingId, payload);
    return result;
});
const generateReportDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    console.log(payload);
    let reportCondition = {};
    switch (payload) {
        case 'Daily':
            reportCondition = {
                createdAt: {
                    $gte: (0, moment_1.default)().startOf('day').toDate(),
                    $lte: (0, moment_1.default)().endOf('day').toDate(),
                },
            };
            break;
        case 'Weekly':
            reportCondition = {
                createdAt: {
                    $gte: (0, moment_1.default)().startOf('week').toDate(),
                    $lte: (0, moment_1.default)().endOf('week').toDate(),
                },
            };
            break;
        case 'Monthly':
            reportCondition = {
                createdAt: {
                    $gte: (0, moment_1.default)().startOf('month').toDate(),
                    $lte: (0, moment_1.default)().endOf('month').toDate(),
                },
            };
            break;
        case 'Yearly':
            reportCondition = {
                createdAt: {
                    $gte: (0, moment_1.default)().startOf('year').toDate(),
                    $lte: (0, moment_1.default)().endOf('year').toDate(),
                },
            };
            break;
        default:
            break;
    }
    const bookingCount = yield booking_model_1.Bookings.countDocuments(reportCondition);
    const availableCars = yield cars_model_1.Cars.countDocuments({ status: "available" });
    const totalRevenue = yield booking_model_1.Bookings.aggregate([
        {
            $match: Object.assign(Object.assign({}, reportCondition), { paid: 'paid' }),
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalCost" },
            },
        },
    ]);
    return {
        bookingCount,
        availableCars,
        totalRevenue: ((_c = totalRevenue[0]) === null || _c === void 0 ? void 0 : _c.totalRevenue) || 0
    };
});
exports.BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB,
    getAllBookingFromDB,
    approveCarFromDB,
    deleteBookingsDB,
    getSingleBookingDB,
    getBookingSummaryDB,
    updateBookingInfoDB,
    generateReportDB
};
