import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { CarService } from "./cars.service";




const createCars = catchAsync(async(req,res)=>{
   if(req.user.role === 'admin'){
    const addCars = req.body
    
    console.log("createCar",req.body)
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


const getSingleCar = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await CarService.getSingleCarFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"A Car retrieved successfully",
        data:result
    })    
})

const updateCar = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const updateCar = req.body;
    const result = await CarService.updateCarFromDB(id,updateCar);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Car updated successfully",
        data:result
    })
});

const returnCar = catchAsync(async(req,res)=>{
   const {bookingId,endTime} = req.body
   console.log(req.body)
   const result = await CarService.returnCarfromDB(bookingId,endTime);

   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Car returned successfully",
    data:result
   })
});

const deleteCar = catchAsync(async(req,res)=>{
const {id} = req.params;
const result = await CarService.deleteCarFromDB(id);
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Car Deleted successfully",
    data:result
})   
}) 


export const CarController= {
    createCars,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar
   
}