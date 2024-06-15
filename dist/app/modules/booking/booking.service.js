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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const booking_model_1 = require("./booking.model");
const cars_model_1 = require("../cars/cars.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBookingIntoDB = (userId, carId, date, startTime) => __awaiter(void 0, void 0, void 0, function* () {
    const carFind = yield cars_model_1.Cars.findById(carId);
    console.log(carFind);
    if (!carFind) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "There is  no car found");
    }
    if (carFind.status !== "available") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Car is Not available");
    }
    if (carFind.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is Not Found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBooking = new booking_model_1.Bookings({
            user: userId,
            car: carId,
            date: date,
            startTime: startTime,
            endTime: null, // End time is null initially
            totalCost: 0 // Total cost is 0 initially
        });
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
const getAllBookingFromDB = (carId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (carId || date) {
        query.car = carId;
        query.date = date;
    }
    const result = yield booking_model_1.Bookings.find(query).populate('user').populate('car');
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Booking Found");
    }
    return result;
});
exports.BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB,
    getAllBookingFromDB
};
