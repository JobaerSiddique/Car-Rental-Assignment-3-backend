import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";


const createBookingIntoDB =async (payload:TBooking) =>{
    const booksCar = await Bookings.create(payload)
    return booksCar;
}



const UserBookingInfoFromDB = async(id:string)=>{
    
    const findUserBooking = await Bookings.find({user:id})
   return findUserBooking
  
}



export const BookingService = {
    createBookingIntoDB,
    UserBookingInfoFromDB
}