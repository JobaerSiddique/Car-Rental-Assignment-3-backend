import { model, Schema } from "mongoose";



const reviewSchema = new Schema({
    
   carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
   user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    comment:{
        type: String,
        required: true,
        trim: true,
    },
    ratings:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

export const Review =  model('reviews', reviewSchema)