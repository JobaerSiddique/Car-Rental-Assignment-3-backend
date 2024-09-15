import { TBooking } from './../booking/booking.interface';
import { Bookings } from "../booking/booking.model";
import { TCars } from "./cars.interface"
import { Cars } from "./cars.model"
import AppError from '../Error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import moment from 'moment';




const createCarsIntoDB = async(payload:TCars)=>{
    const result = await Cars.create(payload)
    return result;
}

const getAllCarsFromDB = async(filters)=>{
  
    const { types, minPrice, maxPrice, isElectric,location,startDate, endDate } = filters;
    const query = {};
    if (types) {
        query.types = types;  
    }
    if (minPrice && maxPrice) {
        query.pricePerHour = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        query.pricePerHour = { $gte: minPrice };
    } else if (maxPrice) {
        query.pricePerHour = { $lte: maxPrice };
    }
    if (isElectric !== undefined) {
        query.isElectric = isElectric === 'true';  
    }
  
  if (location) {
        query.location = location;
    }
    if (startDate && endDate) {
      query.$or = [
          { availabilityDates: { $elemMatch: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
          { availabilityDates: { $size: 0 } },  // Include cars with no availability restrictions
      ];
  }
    console.log();
    const result = await Cars.find(query)
    if(!result.length ){
        throw new AppError (httpStatus.NOT_FOUND,"No Data Found")
    }
    if(result.isDeleted){
      throw new AppError (httpStatus.BAD_REQUEST, "Cars already deleted")
    }
    return result;
}

const getSingleCarFromDB = async(id:string)=>{
    const result = await Cars.findById(id)
    return result;
}


const updateCarFromDB = async(id:string, payload:TCars)=>{
    const findCar= await Cars.findById(id)
    if(!findCar){
        throw new AppError(httpStatus.BAD_REQUEST,"Car not Found ")
    }
    
    const result = await Cars.findByIdAndUpdate(id,payload)
    return result
}
const deleteCarFromDB = async(id:string)=>{

    const result = await Cars.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    result?.status="unavailable"
    await result.save()
    return result
}



const returnCarfromDB = async (bookingId: string, endDate: string, endTime: string) => {
    const findBook = await Bookings.findById(bookingId).populate('user').populate('car');
     
    if (!findBook) {
      throw new AppError(httpStatus.NOT_FOUND, "No Booking Found");
    }
    if (findBook.totalCost > 0) {
      throw new AppError(httpStatus.BAD_REQUEST, "The Car Already Returned");
    }
    if(!findBook.approve){
        throw new AppError(httpStatus.BAD_REQUEST, "Booking not approved");
    }
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
  
      // Set the booking and return date and time
      const bookingDate = findBook.date; // Assuming `date` field is the booking date in 'YYYY-MM-DD' format
      const startTime = findBook.startTime; // Assuming `startTime` is stored in 'HH:mm' format
  
      // Log the date and time to check their values
      console.log("Booking date:", bookingDate);
      console.log("Start time:", startTime);
      console.log("Return date:", endDate);
      console.log("Return time:", endTime);
  
      // Validate date and time formats before creating Date objects
      if (!moment(bookingDate, 'YYYY-MM-DD', true).isValid()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid booking date format");
      }
      if (!moment(endDate, 'YYYY-MM-DD', true).isValid()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid return date format");
      }
      if (!moment(startTime, 'HH:mm', true).isValid()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid start time format");
      }
      if (!moment(endTime, 'HH:mm', true).isValid()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid end time format");
      }
  
      // Create Date objects for start and end time
      const startDateTime = new Date(`${bookingDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);
  
      // Log the constructed Date objects to debug
      console.log("Start DateTime:", startDateTime);
      console.log("End DateTime:", endDateTime);
  
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid date or time format");
      }
  
      // Check if end time is greater than start time
      if (endDateTime <= startDateTime) {
        throw new AppError(httpStatus.BAD_REQUEST, "End time should be greater than start time");
      }
  
      // Calculate the duration in hours
      const durationInMilliseconds = endDateTime.getTime() - startDateTime.getTime();
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
      console.log({durationInHours});
      // Update booking details
      findBook.endTime = endTime;
      findBook.endDate=endDate;
      findBook.duration = parseFloat(durationInHours.toFixed(2)); // Store duration in hours
      findBook.totalCost = parseFloat((durationInHours * findBook.car?.pricePerHour).toFixed(2)); // Calculate total cost
      console.log(findBook.totalCost);
      const updatedBooking = await findBook.save();
  
      // Update car status to 'available'
      const car = await Cars.findById(findBook.car._id);
      if (car) {
        car.status = 'available';
        await car.save();
      }
  
      await session.commitTransaction();
      await session.endSession();
      return updatedBooking;
  
    } catch (error: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  



export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    returnCarfromDB
} 