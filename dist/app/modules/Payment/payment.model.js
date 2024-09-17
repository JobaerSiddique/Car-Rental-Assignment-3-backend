"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    bookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    transId: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Complete', 'Failed', 'Cancel'],
        default: 'Pending'
    },
    date: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString(), // Default to current date as a localized string
    },
    time: {
        type: String,
        required: true,
        default: () => new Date().toLocaleTimeString(), // Default to current date as a localized string
    }
});
exports.Payment = (0, mongoose_1.model)('payment', PaymentSchema);
