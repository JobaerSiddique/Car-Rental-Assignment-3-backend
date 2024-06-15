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
const createCarsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.Cars.create(payload);
    return result;
});
const getAllCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.Cars.find();
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
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
    return result;
});
const returnCarfromDB = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findBook = yield booking_model_1.Bookings.findById(bookingId).populate('user').populate('car');
    if (!findBook) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Booking Found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        findBook.endTime = endTime;
        const startDateTime = new Date(`1970-01-01T${findBook.startTime}:00`).getTime();
        const endDateTime = new Date(`1970-01-01T${endTime}:00`).getTime();
        if (endDateTime <= startDateTime) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "End time should be greater than start time");
        }
        const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
        console.log(durationInHours);
        findBook.totalCost = (parseFloat(durationInHours * ((_a = findBook.car) === null || _a === void 0 ? void 0 : _a.pricePerHour)).toFixed(2));
        console.log(findBook.totalCost);
        const updatedBooking = yield findBook.save();
        // Update car status to 'available'
        const car = yield cars_model_1.Cars.findById(findBook.car._id);
        if (car) {
            car.status = 'available';
            yield car.save();
        }
        if (findBook.car.status === 'available') {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This car already returned");
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
