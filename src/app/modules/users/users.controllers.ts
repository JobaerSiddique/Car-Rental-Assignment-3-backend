import { Response } from 'express';
import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync"
import sendResponse from "../../utilis/sendResponse";
import { UserService } from "./users.service";


const createUser = catchAsync(async(req,res)=>{
    const addUser= req.body;
  
    const result = await UserService.createUserIntoDB(addUser);
   console.log(result);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User created successfully",
        data:result
    })
})

const SignIn = catchAsync(async(req,res)=>{
    const result = await UserService.signInUser(req.body);
    const {user ,accessToken,refreshToken} = result;
    res.cookie('refreshToken',refreshToken);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User signed in successfully",
        data:{user ,accessToken},
        
    })
})

const getMe = catchAsync(async(req,res)=>{
     const {userId,role} = req.user
    
  
  
   const result = await UserService.getMeDB(userId,role)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User retrieved successfully",
        data:result,
    })
})



const UpdateUser = catchAsync(async(req,res)=>{
    const {id} = req.params
    console.log(id);
    const result = await UserService.UpdateUserDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User updated successfully",
        data:result
    })
})

const AllUsers = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit ) || 10;
  
    const {result,totalPages }= await UserService.AllUserDB(page,limit);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Users retrieved successfully",
      data:  {result,totalPages},
        
        
      
    });
  });
const deleteUser = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await UserService.deleteUserDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Users Delete successfully",
        data:result
    })
})

const userUpdateProfile = catchAsync(async(req,res)=>{
    const {userId} = req.user;
    const data = req.body;
    console.log(data);
    const result = await UserService.userUpdateProfileDB(userId,data)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Profile updated successfully",
        data:result,
    })
})

const userStatusUpdate = catchAsync(async(req,res)=>{
    const {id} = req.params;
    
    
    const result = await UserService.UpdateUserStatusDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User status updated successfully",
        data:result,
    })
})

const forgetPassword = catchAsync(async(req,res)=>{
    const {email} = req.body;
    console.log({email});
    const result = await UserService.forgetPasswordDB(email)

}),

const resetPassword = catchAsync(async(req,res)=>{
    const token = req.headers.authorization;
    const result = await UserService.resetPasswordDB(token,req.body);
    console.log({result});
})


export const UserController ={
    createUser,
    SignIn,
    getMe,
    AllUsers,
    UpdateUser,
    deleteUser,
    userUpdateProfile,
    userStatusUpdate,
    forgetPassword,
    resetPassword
   
    
}