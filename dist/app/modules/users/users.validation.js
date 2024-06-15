"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userzodValidation = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "name must be Required" }),
        password: zod_1.z.string({ message: "password must be required" }).min(6),
        role: zod_1.z.enum(['user', 'admin']),
        phone: zod_1.z.string({ message: "phone must be required" }),
        address: zod_1.z.string({ message: "address must be required" })
    })
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string().min(6).optional(),
        role: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    })
});
exports.userzodValidation = {
    userValidation,
    updateUserValidation,
};
// name:string,
//     email:string,
//     password:string,
//     role:"user"|"admin",
//     phone:string,
//     address:string,
