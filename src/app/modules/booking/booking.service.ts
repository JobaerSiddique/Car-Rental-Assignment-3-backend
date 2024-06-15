import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";
import { Cars } from "../cars/cars.model";
import mongoose from "mongoose";


const createBookingIntoDB =async (userId:string,payload:TBooking) =>{
   console.log(payload,userId)
    const {car:carId,startTime,date} = payload;


    const carFind = await Cars.findById(carId)
    if(!carFind){
        throw new AppError(httpStatus.BAD_REQUEST,"There is  no car found")
    }

    if(carFind.status !== "available"){
        throw new AppError(httpStatus.BAD_REQUEST,"Car is Not available")
    }
   if(carFind.isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,"Car is Not Found")
   }
   
   const newBooking = new Bookings({
    user: userId,
    car: carId,
    date: date,
    startTime: startTime,
    endTime: null, // End time is null initially
    totalCost: 0 // Total cost is 0 initially
  });

  carFind.status = "unavailable"
  await carFind.save()

  await newBooking.save()
  return newBooking
}



const UserBookingInfoFromDB = async(id:string)=>{
    
    const findUserBooking = await Bookings.find({user:id})
   return findUserBooking
  
}

const getAllBookingFromDB = async(carId:string,date:string)=>{
    const query: any = {};
    if(carId|| date){
        query.car = carId;
        query.date = date;
    }
    
    
    const result = await Bookings.find(query).populate('user').populate('car')
    if(!result.length){
        throw new AppError(httpStatus.NOT_FOUND,"No Booking Found")
    }
    return result;
}

export const BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB,
    getAllBookingFromDB
    
}