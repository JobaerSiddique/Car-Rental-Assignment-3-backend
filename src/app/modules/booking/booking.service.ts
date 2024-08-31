/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../Error/AppError";

import { Bookings } from "./booking.model";
import { Cars } from "../cars/cars.model";
import mongoose from "mongoose";


const createBookingIntoDB =async (userId:string,carId:string,startTime:string,nid:string,passport:string,drivingLicense:string,date:string) =>{
   

console.log(date,drivingLicense);

    const carFind = await Cars.findById(carId)
 
    
    if(!carFind){
        throw new AppError(httpStatus.BAD_REQUEST,"There is  no car found")
    }

    if(carFind.status !== "available"){
        throw new AppError(httpStatus.BAD_REQUEST,"Car is Not available")
    }
   if(carFind.isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,"Car is no longer available")
   }

   const session = await mongoose.startSession()
   try {
    session.startTransaction()
    const newBooking = new Bookings({
        user: userId,
        car: carId,
        date:date,
        startTime: startTime,
        endTime: null, // End time is null initially
        totalCost: 0 ,// Total cost is 0 initially
        nid: nid,
        passport: passport,
        drivingLicense: drivingLicense
        
        
      });

      console.log({newBooking});
    
      carFind.status = "unavailable"
      await carFind.save()
    
      await newBooking.save()
     
      await session.commitTransaction()
      await session.endSession()
      return newBooking
   } catch (error:any) {
    
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
   }
   

}



const UserBookingInfoFromDB = async(id:string)=>{
    
    const findUserBooking = await Bookings.find({user:id}).populate('user').populate('car')
   return findUserBooking
  
}

const getAllBookingFromDB = async(carId:string,date:string)=>{
    const query: any = {};
    if(carId|| date){
        query.car = carId;
        query.date = date;
    }
    console.log(query)
    
    const result = await Bookings.find(query).populate('user').populate('car')
    console.log(result)
    if(!result.length){
        throw new AppError(httpStatus.NOT_FOUND,"No Booking Found")
    }
    return result;
}
const approveCarFromDB = async(bookingId:string)=>{
    const result = await Bookings.findByIdAndUpdate(bookingId, {
        approve: true
    })
    return result
}

const deleteBookingsDB = async(id:string)=>{
   const result = await Bookings.findByIdAndDelete(id)
   return result;
   
}

const getSingleBookingDB = async(id:string)=>{
    const result = await Bookings.findById({_id:id}).populate('user').populate('car')
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,"Booking not Found")
    }
    return result;
}

const getBookingSummaryDB = async () => {
    // Calculate total bookings
    const totalBookings = await Bookings.countDocuments();
  
    // Calculate available cars
    const availableCars = await Cars.countDocuments({ status: 'available' });
  
    // Calculate total revenue from paid bookings
    const totalRevenue = await Bookings.aggregate([
      {
        $match: {
          paid: 'paid', // Filter bookings where the payment status is 'paid'
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalCost" }, // Sum the totalCost for paid bookings
        },
      },
    ]);
  
    return {
      totalBookings,
      availableCars,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    };
  };
  
export const BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB,
    getAllBookingFromDB,
    approveCarFromDB,
    deleteBookingsDB,
    getSingleBookingDB,
    getBookingSummaryDB
  
    
}