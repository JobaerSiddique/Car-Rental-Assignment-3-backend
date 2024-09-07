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

const getAllBookingFromDB = async(carId:string,date:string,page:number,limit:number)=>{
    const query: any = {};
    if(carId|| date){
        query.car = carId;
        query.date = date;
    }
    const skip = (page - 1) * limit;
    
    const result = await Bookings.find(query).populate('user').populate('car').skip(skip).limit(limit);
    console.log(result)
    if(!result.length){
        throw new AppError(httpStatus.NOT_FOUND,"No Booking Found")
    }
    const total = await Bookings.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    return {result,totalPages,};
}
const approveCarFromDB = async(bookingId:string)=>{
    const result = await Bookings.findByIdAndUpdate(bookingId, {
        approve: true
    })
    return result
}

const deleteBookingsDB = async(id:string)=>{
  console.log({id});
   const userBooking = await Bookings.findById(id)

   if(userBooking.approve === true){
    throw new AppError(httpStatus.BAD_REQUEST,"Booking can not delete already approved Bookings")
   }
   const car = await Cars.findById(userBooking?.car?._id)
   if(!car){
    throw new app.Error(httpStatus.BAD_REQUEST,"No car found");
   }
   if(userBooking?.isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST,"Booking can not delete already deleted Bookings")
   }
   car?.status = "available"
   await car?.save()
  const result = await Bookings.findByIdAndUpdate(id,{isDeleted:true})
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

  const updateBookingInfoDB = async(bookingId:string,payload:any)=>{
    const bookings = await Bookings.findById(bookingId);
    if(bookings.isDeleted || bookings?.approve){
      throw new AppError(httpStatus.BAD_REQUEST,"Booking can not update already approved or deleted Bookings")
    }
    const result = await Bookings.findByIdAndUpdate(bookingId, payload)
   
    return result
}
  
export const BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB,
    getAllBookingFromDB,
    approveCarFromDB,
    deleteBookingsDB,
    getSingleBookingDB,
    getBookingSummaryDB,
    updateBookingInfoDB
  
    
}