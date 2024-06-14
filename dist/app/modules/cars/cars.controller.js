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
exports.CarController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilis/sendResponse"));
const cars_service_1 = require("./cars.service");
const createCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role === 'admin') {
        const addCars = req.body;
        const result = yield cars_service_1.CarService.createCarsIntoDB(addCars);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Car created successfully",
            data: result
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.UNAUTHORIZED,
        success: false,
        message: "You are not authorized to perform this action",
        data: null
    });
}));
const getAllCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("test", req.user);
    const result = yield cars_service_1.CarService.getAllCarsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars fetched successfully",
        data: result
    });
}));
exports.CarController = {
    createCars,
    getAllCars
};
