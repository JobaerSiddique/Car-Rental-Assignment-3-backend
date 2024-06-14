import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync"
import sendResponse from "../../utilis/sendResponse";
import { UserService } from "./users.service";

const createUser = catchAsync(async(req,res)=>{
    const addUser= req.body;
  
    const result = await UserService.createUserIntoDB(addUser);
    console.log("result: ",result);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User created successfully",
        data:result
    })
})

const SignIn = catchAsync(async(req,res)=>{
    const result = await UserService.signInUser(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User signed in successfully",
        data:result
    })
})




export const UserController ={
    createUser,
    SignIn
}