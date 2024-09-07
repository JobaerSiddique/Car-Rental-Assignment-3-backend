import { model, Schema } from "mongoose";




const PaymentSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    transId:{
        type: String,
        required: true
    },
    totalCost:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Complete', 'Failed', 'Cancel'],
        default: 'Pending'
    },
    date: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString(), // Default to current date as a localized string
    },
    time: {
        type: String,
        required: true,
        default: () => new Date().toLocaleTimeString(), // Default to current date as a localized string
    }

})


export const Payment = model('payment',PaymentSchema)