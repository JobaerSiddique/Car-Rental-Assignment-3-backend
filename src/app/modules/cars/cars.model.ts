import { Schema, model } from "mongoose";
import { TCars } from "./cars.interface";



const CarsSchema = new Schema<TCars>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    color:{
        type:String,
        required:true,
        trim:true,
    },
    isElectric:{
        type:Boolean,
        required:true,
    },
    features:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        enum:['available', 'unavailable'],
        required:true,
        default:'available',
    },
    pricePerHour:{
        type:Number,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false,
    }
})




export const Cars = model<TCars>('Car', CarsSchema)