import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

import moment from "moment";



const BookingSchema = new Schema<TBooking>({
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return moment(v, 'YYYY-MM-DD', true).isValid();
        },
        message: (props: any) => `${props.value} is not a valid date!`
      }
    },
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    car: { 
      type: Schema.Types.ObjectId, 
      ref: 'Car', 
      required: true 
    },
    startTime: { 
      type: String, 
      required: true },
    endTime: { 
      type: String, 
      default: null },
    totalCost: { 
      type: Number, 
      default: 0 
    },
  }, {
    timestamps: true,
  })

 


export const Bookings = model <TBooking>('Booking',BookingSchema)