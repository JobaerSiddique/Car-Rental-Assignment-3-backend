import { z } from "zod";


 const carValidator = z.object({
    body:z.object({
        name:z.string(),
    description:z.string(),
    color:z.string(),
    isElectric:z.boolean(),
    features:z.array(z.string()),
    status:z.enum(['available','unavailable']).default('available'),
    pricePerHour:z.number(),
    isDeleted:z.boolean().default(false),
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
const returnCarSchema = z.object({
    body: z.object({
      bookingId: z.string().nonempty(),
      endTime: z.string().refine((time) => {
        const regx = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regx.test(time);
      }, {
        message: 'Invalid time format, expected "HH:MM" in 24-hour format',
      }),
    }),
    
  })

export const carZodValidation = {
    carValidator,
    updateCarValidator,
    returnCarSchema
} 



// name:string,
// description:string,
// color:string,
// isElectric:boolean,
// features:string[],
// status:'available'|'unavailable',
// pricePerHour:number,
// isDeleted:boolean,