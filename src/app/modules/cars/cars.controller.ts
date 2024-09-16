import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { CarService } from "./cars.service";




const createCars = catchAsync(async(req,res)=>{
   const addCars = req.body
    
   
    const result = await CarService.createCarsIntoDB(addCars);
    console.log({result});
    return sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Car created successfully",
        data:result
    })
   
 
   
})


const getAllCars = catchAsync(async(req,res)=>{
    console.log(req.query)
    const { types, minPrice, maxPrice, isElectric ,location ,startDate,endDate} = req.query;
    const result = await CarService.getAllCarsFromDB({types, minPrice, maxPrice, isElectric,location ,startDate,endDate});
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
   const {bookingId,endTime,endDate} = req.body
   console.log(bookingId,endDate,endTime);
   const result = await CarService.returnCarfromDB(bookingId,endDate,endTime);

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
    returnCar,
   
   
}