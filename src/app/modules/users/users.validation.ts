import { z } from "zod";

 const userValidation = z.object({
    body:z.object({
        name:z.string({message:"name must be Required"}),
        email:z.string({message:"email must be Required"}),
    password:z.string({message:"password must be required"}).min(6,{message:"password must be at least 6 characters"}),
    confirmPassword:z.string({message:"password must be required"}).min(6,{message:"password must be at least 6 characters"}),
    role:z.enum(['user', 'admin'],),
    phone:z.string({message:"phone must be required"}),
    image:z.string({message:"image must be required"})
    })
})
 const updateUserValidation = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string({message:"email must be Required"}).optional(),
    password:z.string().min(6).optional(),
    role:z.string().optional(),
    phone:z.string().optional(),
    
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