import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { CarService } from "./cars.service";




const createCars = catchAsync(async(req,res)=>{
   if(req.user.role === 'admin'){
    const addCars = req.body
    const result = await CarService.createCarsIntoDB(addCars);
    return sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Car created successfully",
        data:result
    })
   }
   sendResponse(res,{
    statusCode:httpStatus.UNAUTHORIZED,
    success:false,
    message:"You are not authorized to perform this action",
    data:null
   })
   
})


const getAllCars = catchAsync(async(req,res)=>{
    console.log("test",req.user)
    const result = await CarService.getAllCarsFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Cars fetched successfully",
        data:result
    })
})



export const CarController= {
    createCars,
    getAllCars
}