import { z } from "zod";



const createContactValidate= z.object({
    body:z.object({
        name:z.string({message:"name must be Required"}),
        email:z.string({message:"email must be Required"}),
       
        message:z.string({message:"message must be Required"}),
    })
})


export const Contactvalidate ={
    createContactValidate
}