import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AdminService } from "./admin.services";




const createAdmin = catchAsync(async(req,res)=>{
    const data = req.body;
    console.log(data);
    const result = await AdminService.createAdminIntoDB(data);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Admin created successfully",
        data:result
    })
})




export const AdminController = {
    createAdmin
}