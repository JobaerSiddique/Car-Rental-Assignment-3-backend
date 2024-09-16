import { z } from "zod";



const createReviewValidation = z.object({
    body:z.object({
        comment:z.string({message:"comment must be Required"}),
        ratings:z.number({message:"rating must be Required"}).min(1).max(5),
        carId:z.string({message:"carId must be Required"}),
        user:z.string({message:"userId must be Required"}),
    })
})



export const  ReviewValidation = {
    createReviewValidation
}