"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userzodValidation = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "name must be Required" }),
        email: zod_1.z.string({ message: "email must be Required" }),
        password: zod_1.z.string({ message: "password must be required" }).min(6, { message: "password must be at least 6 characters" }),
        phone: zod_1.z.string({ message: "phone must be required" }),
        image: zod_1.z.string({ message: "image must be required" }),
        address: zod_1.z.string({ message: "address must be required" }),
        status: zod_1.z.enum(['active', 'block']).default('active')
    })
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string({ message: "email must be Required" }).optional(),
        phone: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    })
});
const userForgetValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ message: "email must be Required" }),
    })
});
exports.userzodValidation = {
    userValidation,
    updateUserValidation,
    userForgetValidation
};
// name:string,
//     email:string,
//     password:string,
//     role:"user"|"admin",
//     phone:string,
//     address:string,
