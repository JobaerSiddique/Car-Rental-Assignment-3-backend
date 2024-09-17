"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ message: "comment must be Required" }),
        ratings: zod_1.z.number({ message: "rating must be Required" }).min(1).max(5),
        carId: zod_1.z.string({ message: "carId must be Required" }),
        user: zod_1.z.string({ message: "userId must be Required" }),
    })
});
exports.ReviewValidation = {
    createReviewValidation
};
