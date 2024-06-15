import { TBooking } from './../booking/booking.interface';
import { Bookings } from "../booking/booking.model";
import { TCars } from "./cars.interface"
import { Cars } from "./cars.model"
import AppError from '../Error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';




const createCarsIntoDB = async(payload:TCars)=>{
    const result = await Cars.create(payload)
    return result;
}

const getAllCarsFromDB = async()=>{
    const result = await Cars.find()
    if(!result.length ){
        throw new AppError (httpStatus.NOT_FOUND,"No Data Found")
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
    return result
}

const returnCarfromDB = async(bookingId:string,endTime:string)=>{
  
   const findBook= await Bookings.findById(bookingId).populate('user').populate('car');
   
 if(!findBook){
    throw new AppError(httpStatus.NOT_FOUND,"No Booking Found")
 }

  const session = await mongoose.startSession()
  try {
    session.startTransaction();
    findBook.endTime = endTime;

    const startDateTime = new Date(`1970-01-01T${findBook.startTime}:00`).getTime();
    const endDateTime = new Date(`1970-01-01T${endTime}:00`).getTime();
    if(endDateTime<= startDateTime){
        throw new AppError(httpStatus.BAD_REQUEST,"End time should be greater than start time")
    }
    const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    console.log(durationInHours)
    findBook.totalCost = (parseFloat(durationInHours * findBook.car?.pricePerHour).toFixed(2));
    console.log(findBook.totalCost)
    const updatedBooking = await findBook.save();
      // Update car status to 'available'
      const car = await Cars.findById(findBook.car._id);
      if (car) {
          car.status = 'available';
          await car.save();
      }
      if(findBook.car.status === 'available'){
        throw new AppError(httpStatus.BAD_REQUEST,"This car already returned")
     
    }
    await session.commitTransaction();
    await session.endSession();
      return updatedBooking;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,error.message);
  }
}
export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    returnCarfromDB
} 