import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { BookingService } from "./booking.service";
import { Bookings } from "./booking.model";



const createBooking = catchAsync(async(req,res)=>{
    const addbooks = req.body
    const result = await BookingService.createBookingIntoDB(addbooks)
    const populateResult = await (await result.populate('user')).populate('car')
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: populateResult
    })
})



export const BookingController ={
    createBooking
}