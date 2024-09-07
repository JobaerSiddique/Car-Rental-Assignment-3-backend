import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { BookingService } from "./booking.service";





const createBooking = catchAsync(async(req,res)=>{
    const user = req.user.userId
   const {carId,startTime,nid,passport,drivingLicense,date}= req.body;
   console.log(req.body);
    const result = await BookingService.createBookingIntoDB(user,carId,startTime,nid,passport,drivingLicense,date)
    const populateResult = await(await result?.populate("user"))?.populate("car")


    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: populateResult
    })
})

const userBooking = catchAsync(async(req,res) =>{
    console.log(req.user)
   const userId = req.user.userId
  
   const result = await BookingService.UserBookingInfoFromDB(userId)
   sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result
   })
   
})

const getAllBooking= catchAsync(async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit ) || 10
    const { carId, date } = req.query;
   
    const {result,totalPages} =  await BookingService.getAllBookingFromDB(carId,date,page,limit)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: {result,totalPages}
    })
})
const approveCar = catchAsync(async(req,res)=>{
    
    const {id} = req.params;
    console.log(id);
    const result = await BookingService.approveCarFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Car approved successfully",
        data:result
    })
});
const getSingleBooking = catchAsync(async(req,res)=>{
    
    const id = req.params.id;
    console.log(id,req.user);
    const result = await BookingService.getSingleBookingDB(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result
    })
})


const deleteBookings = catchAsync(async(req,res)=>{
    const {id} = req.params
   console.log(id);
    const result = await BookingService.deleteBookingsDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
    success:true,
        message:"Bookings deleted successfully",
        data: result
    })
})

const totalSummery = catchAsync(async(req,res)=>{
    const result = await BookingService.getBookingSummaryDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking summary retrieved successfully",
      data: result,
    });
})

const bookingUpdate = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const result = await BookingService.updateBookingInfoDB(id,data)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking updated successfully",
        data: result,
    })
})
export const BookingController ={
    createBooking,
    userBooking,
    getAllBooking,
    approveCar,
    deleteBookings,
    getSingleBooking,
    totalSummery,
    bookingUpdate
    
  
   
}