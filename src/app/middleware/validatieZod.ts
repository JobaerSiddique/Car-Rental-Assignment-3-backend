import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod"
// make folder wise higher order function so that code can organize
const validationZod = (schema: AnyZodObject)=>{
    
    return async(req:Request,res:Response,next:NextFunction)=>{
            try {
                await schema.parseAsync({
                    body: req.body
                });
                next()
            } catch (error) {
                next(error)
            }    
}
}

export default validationZod;