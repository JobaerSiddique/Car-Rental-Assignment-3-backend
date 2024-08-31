import { z } from "zod";




const createAdminValidation = z.object({
    body:z.object({
        name:z.string({message:"name must be Required"}),
        email:z.string({message:"email must be Required"}),
    password:z.string({message:"password must be required"}).min(6,{message:"password must be at least 6 characters"}),
    confirmPassword:z.string({message:"password must be required"}).min(6,{message:"password must be at least 6 characters"}),
    role:z.enum(['user','admin']).default('admin'),
    phone:z.string({message:"phone must be required"}),
    image:z.string().optional()
    
    })
})




export const AdminValidation = {
    createAdminValidation
}