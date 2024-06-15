"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const Auth_1 = __importDefault(require("../../middleware/Auth"));
const users_constant_1 = require("../users/users.constant");
const validatieZod_1 = __importDefault(require("../../middleware/validatieZod"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(users_constant_1.USER_ROLE.user), (0, validatieZod_1.default)(booking_validation_1.bookingValidations.bookingValidationSchema), booking_controller_1.BookingController.createBooking);
router.get('/my-bookings', (0, Auth_1.default)(users_constant_1.USER_ROLE.user), booking_controller_1.BookingController.userBooking);
router.get('/', booking_controller_1.BookingController.getAllBooking);
exports.BookingRoutes = router;
