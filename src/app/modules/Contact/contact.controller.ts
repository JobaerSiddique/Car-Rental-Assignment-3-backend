import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { ContactService } from "./contact.service";



const createContact = catchAsync(async(req,res)=>{
    const addContact = req.body;
    const result = await ContactService.createContactDB(addContact)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Contact created successfully",
        data:result
    })
})



export const ContactController ={
    createContact
}