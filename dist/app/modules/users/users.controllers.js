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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilis/sendResponse"));
const users_service_1 = require("./users.service");
const AppError_1 = __importDefault(require("../Error/AppError"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addUser = req.body;
    const result = yield users_service_1.UserService.createUserIntoDB(addUser);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User created successfully",
        data: result
    });
}));
const SignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_service_1.UserService.signInUser(req.body);
    const { user, accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User signed in successfully",
        data: { user, accessToken },
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield users_service_1.UserService.getMeDB(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
}));
const UpdateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield users_service_1.UserService.UpdateUserDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: result
    });
}));
const AllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { result, totalPages } = yield users_service_1.UserService.AllUserDB(page, limit);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Users retrieved successfully",
        data: { result, totalPages },
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield users_service_1.UserService.deleteUserDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users Delete successfully",
        data: result
    });
}));
const userUpdateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const data = req.body;
    console.log(data);
    const result = yield users_service_1.UserService.userUpdateProfileDB(userId, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Profile updated successfully",
        data: result,
    });
}));
const userStatusUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield users_service_1.UserService.UpdateUserStatusDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield users_service_1.UserService.forgetPasswordDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset link sent successfully",
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const { email, password } = req.body;
    const result = yield users_service_1.UserService.resetPasswordDB(token, email, password);
    console.log(result);
    console.log({ token, email, password });
    if (!token) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Token not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully",
        data: result,
    });
}));
exports.UserController = {
    createUser,
    SignIn,
    getMe,
    AllUsers,
    UpdateUser,
    deleteUser,
    userUpdateProfile,
    userStatusUpdate,
    forgetPassword,
    resetPassword
};
// http://localhost:5173?email=jobaersiddique@gmail.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRjNTcwYzVhMDFkMWRiY2ViMmNiOTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNTc4NDM2OSwiZXhwIjoxNzI1Nzg1MjY5fQ.SxwgNiwFDOJtvW8TEOgpfxAh8kFtLt9LqxMcAWBIJ0U
