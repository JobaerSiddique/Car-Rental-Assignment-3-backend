"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const dateFormate_1 = require("../../utilis/dateFormate");
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
        default: "null"
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Car"
    },
    totalCost: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
BookingSchema.pre('save', function (next) {
    this.date = (0, dateFormate_1.extractDatePart)(new Date());
    next();
});
exports.Bookings = (0, mongoose_1.model)('Booking', BookingSchema);
