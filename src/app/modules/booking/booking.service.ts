import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";


const createBookingIntoDB =async (payload:TBooking) =>{
    const booksCar = await Bookings.create(payload)
    return booksCar;
}



export const BookingService = {
    createBookingIntoDB
}