import { z } from "zod";


const carValidator = z.object({
  body: z.object({
      name: z.string(),
      description: z.string(),
      color: z.string(),
      isElectric: z.preprocess(val => val === 'true', z.boolean()),
      features: z.array(z.string()),
      types: z.string(),
      image: z.string(),
      status: z.enum(['available', 'unavailable']).default('available'),
      pricePerHour: z.preprocess(val => parseFloat(val), z.number()),
      isDeleted: z.boolean().default(false),
      model: z.string(),
      year: z.string(),
      gps: z.preprocess(val => val === 'true', z.boolean()),
      childSeat: z.preprocess(val => val === 'true', z.boolean())
  })
});
 const updateCarValidator = z.object({
    body:z.object({
        name:z.string().optional(),
    description:z.string().optional(),
    color:z.string().optional(),
    isElectric:z.boolean().optional(),
    features:z.array(z.string()).optional(),
    types:z.string().optional(),
    status:z.enum(['available','unavailable']).optional(),
    pricePerHour:z.number().optional(),
    isDeleted:z.boolean().optional(),
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