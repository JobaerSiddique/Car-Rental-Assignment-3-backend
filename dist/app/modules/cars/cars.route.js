"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoute = void 0;
const express_1 = __importDefault(require("express"));
const cars_controller_1 = require("./cars.controller");
const Auth_1 = __importDefault(require("../../middleware/Auth"));
const users_constant_1 = require("../users/users.constant");
console.log("userRole", users_constant_1.USER_ROLE);
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(users_constant_1.USER_ROLE.admin), cars_controller_1.CarController.createCars);
router.get('/', cars_controller_1.CarController.getAllCars);
exports.CarRoute = router;
