"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carZodValidation = void 0;
const zod_1 = require("zod");
const carValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        color: zod_1.z.string(),
        isElectric: zod_1.z.boolean(),
        features: zod_1.z.array(zod_1.z.string()),
        status: zod_1.z.enum(['available', 'unavailable']).default('available'),
        pricePerHour: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().default(false),
    })
});
const updateCarValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        isElectric: zod_1.z.boolean().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum(['available', 'unavailable']).optional(),
        pricePerHour: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
const returnCarSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().nonempty(),
        endTime: zod_1.z.string().refine((time) => {
            const regx = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regx.test(time);
        }, {
            message: 'Invalid time format, expected "HH:MM" in 24-hour format',
        }),
    }),
});
exports.carZodValidation = {
    carValidator,
    updateCarValidator,
    returnCarSchema
};
// name:string,
// description:string,
// color:string,
// isElectric:boolean,
// features:string[],
// status:'available'|'unavailable',
// pricePerHour:number,
// isDeleted:boolean,
