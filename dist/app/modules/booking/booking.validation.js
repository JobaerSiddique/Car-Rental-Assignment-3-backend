"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "date format invalid, expected 'YYYY-MM-DD" }),
        user: zod_1.z.string().optional(),
        carId: zod_1.z.string(), // YYYY-MM-DD format
        startTime: zod_1.z.string().refine((time) => {
            const regx = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regx.test(time);
        }, {
            message: 'invaild time format,expected "HH:MM" in 24 hours'
        }), // HH:MM format
        endTime: zod_1.z.string().refine((time) => {
            const regx = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regx.test(time);
        }, {
            message: 'invaild time format,expected "HH:MM" in 24 hours'
        }).optional(), // HH:MM format or null
        totalCost: zod_1.z.number().nonnegative().default(0), //
    }).refine((body) => {
        if (body.endTime) {
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);
            return end > start;
        }
        return true;
    })
});
const updateBookingValidations = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
        startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
        endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/).nullable(), // HH:MM format or null
        totalCost: zod_1.z.number().nonnegative(),
    })
});
exports.bookingValidations = {
    bookingValidationSchema,
    updateBookingValidations,
};
// date: string;
//     startTime: string;
//     endTime: string;
//     user: Types.ObjectId;
//     car:Types.ObjectId;
//     totalCost: Number;
