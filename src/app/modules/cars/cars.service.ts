import { TBooking } from './../booking/booking.interface';
import { Bookings } from "../booking/booking.model";
import { TCars } from "./cars.interface"
import { Cars } from "./cars.model"
import AppError from '../Error/AppError';
import httpStatus from 'http-status';



const createCarsIntoDB = async(payload:TCars)=>{
    const result = await Cars.create(payload)
    return result;
}

const getAllCarsFromDB = async()=>{
    const result = await Cars.find()
    return result;
}

const getSingleCarFromDB = async(id:string)=>{
    const result = await Cars.findById(id)
    return result;
}


const updateCarFromDB = async(id:string, payload:TCars)=>{
    const result = await Cars.findByIdAndUpdate(id,payload)
    return result
}
const deleteCarFromDB = async(id:string)=>{
    const result = await Cars.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

const returnCarfromDB = async(bookingId:string,endTime:string)=>{
  
   const findBook= await Bookings.findById(bookingId).populate('user').populate('car');
   console.log(findBook)
 if(!findBook){
    throw new AppError(httpStatus.NOT_FOUND,"No Booking Found")
 }

  findBook.endTime = endTime;

    const startDateTime = new Date(`1970-01-01T${findBook.startTime}:00Z`).getTime();
    const endDateTime = new Date(`1970-01-01T${endTime}:00Z`).getTime();
    const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    findBook.totalCost = parseFloat(durationInHours * findBook.car?.pricePerHour).toFixed(2);

    const updatedBooking = await findBook.save();
      // Update car status to 'available'
      const car = await Cars.findById(findBook.car._id);
      if (car) {
          car.status = 'available';
          await car.save();
      }
      console.log("updated",updatedBooking)
      return updatedBooking;
}
export const CarService = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    returnCarfromDB
} 