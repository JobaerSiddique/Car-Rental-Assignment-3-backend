import { z } from "zod";

 const userValidation = z.object({
    body:z.object({
        name:z.string({message:"name must be Required"}),
    password:z.string({message:"password must be required"}).min(6),
    role:z.enum(['user', 'admin'],),
    phone:z.string({message:"phone must be required"}),
    address:z.string({message:"address must be required"})
    })
})
 const updateUserValidation = z.object({
    body:z.object({
        name:z.string().optional(),
    password:z.string().min(6).optional(),
    role:z.string().optional(),
    phone:z.string().optional(),
    address:z.string().optional(),
    })
})

export const userzodValidation = {
    userValidation,
    updateUserValidation,
}
// name:string,
//     email:string,
//     password:string,
//     role:"user"|"admin",
//     phone:string,
//     address:string,