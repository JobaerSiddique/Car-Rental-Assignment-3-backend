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
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const users_model_1 = require("./users.model");
const config_1 = __importDefault(require("../../../config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield users_model_1.User.findOne({ email: payload.email });
    if (emailExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email already exist");
    }
    const result = yield users_model_1.User.create(payload);
    return result;
});
const signInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield users_model_1.User.findOne({ email: payload.email });
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const matchPassword = yield bcrypt_1.default.compare(payload.password, findUser.password);
    if (!matchPassword) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid email or password");
    }
    const jwtPayload = {
        userId: findUser === null || findUser === void 0 ? void 0 : findUser._id,
        role: findUser === null || findUser === void 0 ? void 0 : findUser.role
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt, {
        expiresIn: "10d"
    });
    const result = {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        data: {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            phone: findUser.phone,
            address: findUser.address,
        },
        token
    };
    return result;
});
exports.UserService = {
    createUserIntoDB,
    signInUser
};
