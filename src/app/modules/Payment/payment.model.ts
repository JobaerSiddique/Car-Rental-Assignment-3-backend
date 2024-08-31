import { model, Schema } from "mongoose";




const PaymentSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Bookings',
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
    }

})


export const Payment = model('payment',PaymentSchema)