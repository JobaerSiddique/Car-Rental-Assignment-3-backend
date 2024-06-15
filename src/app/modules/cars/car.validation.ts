import { z } from "zod";


 const carValidator = z.object({
    body:z.object({
        name:z.string(),
    description:z.string(),
    color:z.string(),
    isElectric:z.boolean(),
    features:z.array(z.string()),
    status:z.enum(['available','unavailable']),
    pricePerHour:z.number(),
    isDeleted:z.boolean(),
    })
})
 const updateCarValidator = z.object({
    body:z.object({
        name:z.string(),
    description:z.string(),
    color:z.string(),
    isElectric:z.boolean(),
    features:z.array(z.string()),
    status:z.enum(['available','unavailable']),
    pricePerHour:z.number(),
    isDeleted:z.boolean(),
    })
})

export const carZodValidation = {
    carValidator,
    updateCarValidator,
} 



// name:string,
// description:string,
// color:string,
// isElectric:boolean,
// features:string[],
// status:'available'|'unavailable',
// pricePerHour:number,
// isDeleted:boolean,