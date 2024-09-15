import { z } from "zod";



const createReviewValidation = z.object({
    body:z.object({
        comment:z.string({message:"comment must be Required"}),
        rating:z.number({message:"rating must be Required"}).min(1).max(5),
        carId:z.string({message:"carId must be Required"}),
        userId:z.string({message:"userId must be Required"}),
    })
})