import { z } from "zod";

 const userValidation = z.object({
    body:z.object({
        name:z.string({message:"name must be Required"}),
        email:z.string({message:"email must be Required"}),
    password:z.string({message:"password must be required"}).min(6,{message:"password must be at least 6 characters"}),
    
    phone:z.string({message:"phone must be required"}),
    image:z.string({message:"image must be required"}),
    address:z.string({message:"address must be required"}),
    status:z.enum(['active','block']).default('active')
    })
})
 const updateUserValidation = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string({message:"email must be Required"}).optional(),
    phone:z.string().optional(),
    image:z.string().optional(),
    address:z.string().optional(),
    
    })
})
const userForgetValidation = z.object({
    body:z.object({
        email:z.string({message:"email must be Required"}),
    })
})


export const userzodValidation = {
    userValidation,
    updateUserValidation,
    userForgetValidation
}


// name:string,
//     email:string,
//     password:string,
//     role:"user"|"admin",
//     phone:string,
//     address:string,