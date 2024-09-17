"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contactvalidate = void 0;
const zod_1 = require("zod");
const createContactValidate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "name must be Required" }),
        email: zod_1.z.string({ message: "email must be Required" }),
        message: zod_1.z.string({ message: "message must be Required" }),
    })
});
exports.Contactvalidate = {
    createContactValidate
};
