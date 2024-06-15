"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return (0, moment_1.default)(v, 'YYYY-MM-DD', true).isValid();
            },
            message: (props) => `${props.value} is not a valid date!`
        }
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
});
exports.Bookings = (0, mongoose_1.model)('Booking', BookingSchema);
