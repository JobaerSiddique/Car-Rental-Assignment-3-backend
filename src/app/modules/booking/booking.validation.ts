import { z } from "zod";

const bookingValidationSchema = z.object({
    body:z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        user:z.string().optional(),
        car:z.string(), // YYYY-MM-DD format
    startTime: z.string().refine((time)=>{
        const regx= /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regx.test(time);
    },{
        message:'invaild time format,expected "HH:MM" in 24 hours'
    }), // HH:MM format
    endTime: z.string().refine((time)=>{
        const regx= /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regx.test(time);
    },{
        message:'invaild time format,expected "HH:MM" in 24 hours'
    }).optional(), // HH:MM format or null
    
    totalCost: z.number().nonnegative().default(0), //
    }).refine((body)=>{
       
        if(body.endTime){
            const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end> start
        }
        return true;
       
        
    })
})
 const updateBookingValidations = z.object({
    body:z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
    startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
    endTime: z.string().regex(/^\d{2}:\d{2}$/).nullable(), // HH:MM format or null
    
    totalCost: z.number().nonnegative(),
    })
})

export const bookingValidations = {
 bookingValidationSchema,
 updateBookingValidations
}





// date: string;
//     startTime: string;
//     endTime: string;
//     user: Types.ObjectId;
//     car:Types.ObjectId;
//     totalCost: Number;