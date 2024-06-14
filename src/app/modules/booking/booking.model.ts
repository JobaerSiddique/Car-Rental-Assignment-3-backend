import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { extractDatePart } from "../../utilis/dateFormate";



const BookingSchema = new Schema<TBooking>({
    date:{
        type:Date,
        required:true,
        default: Date.now()
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
        default:"null"
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    car:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Car"
    },
    
    totalCost:{
        type:Number,
       
        default:0
    }
},{
    timestamps:true
})

BookingSchema.pre('save', function(next){
    this.date = extractDatePart(new Date());
  next();
})


export const Bookings = model <TBooking>('Booking',BookingSchema)