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
const users_utils_1 = require("./users.utils");
const sendEmail_1 = require("../../utilis/sendEmail");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield users_model_1.User.findOne({ email: payload.email });
    if (emailExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email already exist");
    }
    if (payload.password !== payload.confirmPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password does not match");
    }
    const result = yield users_model_1.User.create(payload);
    return result;
});
const signInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User have no access");
    }
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User already blocked");
    }
    const matchPassword = yield bcrypt_1.default.compare(payload.password, user.password);
    console.log({ matchPassword });
    if (!matchPassword) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid email or password");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.jwt, config_1.default.accessTokenExpires);
    const refreshToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.RefreshToken, config_1.default.refreshTokenExpires);
    return { user, accessToken, refreshToken };
});
const getMeDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role) {
        result = yield users_model_1.User.findById({ _id: userId });
    }
    return result;
});
const AllUserDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(page, limit);
    const skip = (page - 1) * limit;
    // console.log(skip);
    const result = yield users_model_1.User.find({}).skip(skip).limit(limit);
    const totalUser = yield users_model_1.User.countDocuments({});
    // console.log(totalUser,limit);
    const totalPages = Math.ceil(totalUser / limit);
    console.log(result, totalPages);
    return { result, totalPages };
});
const UpdateUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findById(id);
    if (result.role === 'admin') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Admin can't update their role");
    }
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (result.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User have no access");
    }
    if (result.status === 'block') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User already blocked");
    }
    result.role = 'admin';
    yield result.save();
    return result;
});
const UpdateUserStatusDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ id });
    const result = yield users_model_1.User.findById(id);
    console.log({ result });
    if (result.role === 'admin') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Admin can't update their role");
    }
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    result.status = "block";
    yield result.save();
    // return result;
    console.log(result);
});
const deleteUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is Already deleted");
    }
    const result = yield users_model_1.User.findByIdAndUpdate(id, { isDelete: true });
    return result;
});
const userUpdateProfileDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(id);
    console.log({ payload });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    const result = yield users_model_1.User.findByIdAndUpdate(id, payload);
    console.log(result);
    return result;
});
const forgetPasswordDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ email: email });
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.jwt, "10m");
    const resetLink = `https://dapper-nasturtium-bce1b7.netlify.app/reset-Password?email=${user.email}&token=${accessToken}`;
    console.log({ resetLink });
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
});
const resetPasswordDB = (token, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDelete) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    if (user.passwordChangeCount >= 3) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password change limit reached');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt);
    if (!user._id.equals(decoded.userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_Rounds));
    yield users_model_1.User.findOneAndUpdate({
        _id: decoded.userId,
        role: decoded.role
    }, {
        password: hashedPassword,
        passwordChangedAt: new Date(),
        $inc: { passwordChangeCount: 1 },
    });
});
exports.UserService = {
    createUserIntoDB,
    signInUser,
    getMeDB,
    AllUserDB,
    UpdateUserDB,
    deleteUserDB,
    userUpdateProfileDB,
    UpdateUserStatusDB,
    forgetPasswordDB,
    resetPasswordDB
};
