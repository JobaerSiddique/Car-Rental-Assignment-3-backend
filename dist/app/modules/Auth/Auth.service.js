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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const users_model_1 = require("../users/users.model");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user is exist
    // const isExistUser = await User.findOne({email: payload?.email})
    // if(!isExistUser) {
    //     throw new AppError(httpStatus.NOT_FOUND,"User not found")
    // }
    // // check if password is correct
    // const isPasswordMatch = await bcrypt.compare(payload?.password,isExistUser?.password);
    // if(!isPasswordMatch) {
    //     throw new AppError(httpStatus.NOT_FOUND,"Invalid email or password")
    // }
    const user = yield users_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!(yield users_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user.password))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid email or password");
    }
    const jwtPayload = {
        userId: user.email,
        role: user.role
    };
    const accesssToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt, {
        expiresIn: "10d"
    });
    return accesssToken;
});
exports.AuthService = {
    loginUser
};
