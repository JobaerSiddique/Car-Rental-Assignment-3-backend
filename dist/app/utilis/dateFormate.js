"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDatePart = void 0;
const extractDatePart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
exports.extractDatePart = extractDatePart;
