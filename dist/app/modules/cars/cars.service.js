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
exports.CarService = void 0;
const booking_model_1 = require("../booking/booking.model");
const cars_model_1 = require("./cars.model");
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const createCarsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload", payload);
    const result = yield cars_model_1.Cars.create(payload);
    return result;
});
const getAllCarsFromDB = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { types, minPrice, maxPrice, isElectric, location, startDate, endDate } = filters;
    const query = {};
    if (types) {
        query.types = types;
    }
    if (minPrice && maxPrice) {
        query.pricePerHour = { $gte: minPrice, $lte: maxPrice };
    }
    else if (minPrice) {
        query.pricePerHour = { $gte: minPrice };
    }
    else if (maxPrice) {
        query.pricePerHour = { $lte: maxPrice };
    }
    if (isElectric !== undefined) {
        query.isElectric = isElectric === 'true';
    }
    if (location) {
        query.location = location;
    }
    if (startDate && endDate) {
        query.$or = [
            { availabilityDates: { $elemMatch: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
            { availabilityDates: { $size: 0 } },
        ];
    }
    const result = yield cars_model_1.Cars.find(query);
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found or min price this car not Found");
    }
    if (result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cars already deleted");
    }
    return result;
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.Cars.findById(id);
    return result;
});
const updateCarFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findCar = yield cars_model_1.Cars.findById(id);
    if (!findCar) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Car not Found ");
    }
    const result = yield cars_model_1.Cars.findByIdAndUpdate(id, payload);
    return result;
});
const deleteCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.Cars.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    result === null || result === void 0 ? void 0 : result.status = "unavailable";
    yield result.save();
    return result;
});
const returnCarfromDB = (bookingId, endDate, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findBook = yield booking_model_1.Bookings.findById(bookingId).populate('user').populate('car');
    if (!findBook) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Booking Found");
    }
    if (findBook.totalCost > 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "The Car Already Returned");
    }
    if (!findBook.approve) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booking not approved");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Set the booking and return date and time
        const bookingDate = findBook.date; // Assuming `date` field is the booking date in 'YYYY-MM-DD' format
        const startTime = findBook.startTime; // Assuming `startTime` is stored in 'HH:mm' format
        // Log the date and time to check their values
        console.log("Booking date:", bookingDate);
        console.log("Start time:", startTime);
        console.log("Return date:", endDate);
        console.log("Return time:", endTime);
        // Validate date and time formats before creating Date objects
        if (!(0, moment_1.default)(bookingDate, 'YYYY-MM-DD', true).isValid()) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid booking date format");
        }
        if (!(0, moment_1.default)(endDate, 'YYYY-MM-DD', true).isValid()) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid return date format");
        }
        if (!(0, moment_1.default)(startTime, 'HH:mm', true).isValid()) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid start time format");
        }
        if (!(0, moment_1.default)(endTime, 'HH:mm', true).isValid()) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid end time format");
        }
        // Create Date objects for start and end time
        const startDateTime = new Date(`${bookingDate}T${startTime}:00`);
        const endDateTime = new Date(`${endDate}T${endTime}:00`);
        // Log the constructed Date objects to debug
        console.log("Start DateTime:", startDateTime);
        console.log("End DateTime:", endDateTime);
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid date or time format");
        }
        // Check if end time is greater than start time
        if (endDateTime <= startDateTime) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "End time should be greater than start time");
        }
        // Calculate the duration in hours
        const durationInMilliseconds = endDateTime.getTime() - startDateTime.getTime();
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
        console.log({ durationInHours });
        // Update booking details
        findBook.endTime = endTime;
        findBook.endDate = endDate;
        findBook.duration = parseFloat(durationInHours.toFixed(2)); // Store duration in hours
        findBook.totalCost = parseFloat((durationInHours * ((_a = findBook.car) === null || _a === void 0 ? void 0 : _a.pricePerHour)).toFixed(2)); // Calculate total cost
        console.log(findBook.totalCost);
        const updatedBooking = yield findBook.save();
        // Update car status to 'available'
        const car = yield cars_model_1.Cars.findById(findBook.car._id);
        if (car) {
            car.status = 'available';
            yield car.save();
        }
        yield session.commitTransaction();
        yield session.endSession();
        return updatedBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    returnCarfromDB
};
