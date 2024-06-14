"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("./users.controllers");
const router = express_1.default.Router();
router.post('/signup', users_controllers_1.UserController.createUser);
router.post('/signin', users_controllers_1.UserController.SignIn);
exports.UserRoute = router;
