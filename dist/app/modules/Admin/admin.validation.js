"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "name must be Required" }),
        email: zod_1.z.string({ message: "email must be Required" }),
        password: zod_1.z.string({ message: "password must be required" }).min(6, { message: "password must be at least 6 characters" }),
        confirmPassword: zod_1.z.string({ message: "password must be required" }).min(6, { message: "password must be at least 6 characters" }),
        role: zod_1.z.enum(['user', 'admin']).default('admin'),
        phone: zod_1.z.string({ message: "phone must be required" }),
        image: zod_1.z.string().optional()
    })
});
exports.AdminValidation = {
    createAdminValidation
};
