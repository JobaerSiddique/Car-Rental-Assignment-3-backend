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
      required: true 
  },
  endTime: { 
      type: String, 
      default: null 
  },
  totalCost: { 
      type: Number, 
      default: 0 
  },
  approve: {
      type: Boolean,
      default: false,
  },
  paid: {
      type: String,
      default: 'unpaid' 
  },
  nid: { 
      type: String,
      validate: {
          validator: function(v: string) {
              return this.passport ? true : !!v;
          },
          message: 'NID is required if Passport is not provided.'
      }
  },
  passport: { 
      type: String,
      validate: {
          validator: function(v: string) {
              return this.nid ? true : !!v;
          },
          message: 'Passport is required if NID is not provided.'
      }
  },
  drivingLicense: { 
      type: String, 
      required: true 
  },
  gps: { 
      type: Boolean, 
      default: false 
  },
  childSeat: { 
      type: Boolean, 
      default: false 
  },
  duration: {
      type: Number,
      default: 0
  },
  isDeleted: {
      type: Boolean,
      required: true,
      default: false
  },
  endDate: {
      type: String,
      default: null,  // Make sure this is optional and not required during booking creation
      validate: {
          validator: function (v: string) {
              return !v || moment(v, 'YYYY-MM-DD', true).isValid();  // If provided, validate the format
          },
          message: (props: any) => `${props.value} is not a valid date!`
      }
  }
}, {
  timestamps: true,
});


 


export const Bookings = model <TBooking>('Booking',BookingSchema)