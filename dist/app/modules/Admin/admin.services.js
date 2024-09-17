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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const users_model_1 = require("../users/users.model");
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const user = yield users_model_1.User.findOne({ email: email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Admin Already Exists");
    }
    if (payload.password !== payload.confirmPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password does not match");
    }
    payload.role = "admin";
    const result = yield users_model_1.User.create(payload);
    return result;
});
exports.AdminService = {
    createAdminIntoDB
};
