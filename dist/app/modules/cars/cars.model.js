"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cars = void 0;
const mongoose_1 = require("mongoose");
const CarsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    isElectric: {
        type: Boolean,
        required: false,
    },
    features: {
        type: [String],
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        required: true,
        default: 'available',
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    gps: {
        type: Boolean,
        default: false,
    },
    childSeat: {
        type: Boolean,
        default: false,
    },
    location: {
        type: String,
        required: true,
    },
    availabilityDates: {
        type: [Date],
        required: false,
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true
});
exports.Cars = (0, mongoose_1.model)('Car', CarsSchema);
