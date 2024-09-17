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
    approve: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: String,
        default: 'unpaid'
    },
    nid: {
        type: String,
        validate: {
            validator: function (v) {
                return this.passport ? true : !!v;
            },
            message: 'NID is required if Passport is not provided.'
        }
    },
    passport: {
        type: String,
        validate: {
            validator: function (v) {
                return this.nid ? true : !!v;
            },
            message: 'Passport is required if NID is not provided.'
        }
    },
    drivingLicense: {
        type: String,
        required: true
    },
    gps: {
        type: Boolean,
        default: false
    },
    childSeat: {
        type: Boolean,
        default: false
    },
    duration: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    endDate: {
        type: String,
        default: null, // Make sure this is optional and not required during booking creation
        validate: {
            validator: function (v) {
                return !v || (0, moment_1.default)(v, 'YYYY-MM-DD', true).isValid(); // If provided, validate the format
            },
            message: (props) => `${props.value} is not a valid date!`
        }
    }
}, {
    timestamps: true,
});
exports.Bookings = (0, mongoose_1.model)('Booking', BookingSchema);
