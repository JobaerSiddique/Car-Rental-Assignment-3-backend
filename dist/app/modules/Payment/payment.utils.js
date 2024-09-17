"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransId = void 0;
const generateTransId = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `CRH${randomNumber}`;
};
exports.generateTransId = generateTransId;
