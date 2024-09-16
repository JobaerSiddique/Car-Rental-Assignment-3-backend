import { model, Schema } from "mongoose";
import { TContact } from "./contact.interface";


const ContactSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Please enter a valid email address.'
        }
    },
    message:{
        type: String,
        required: true,
        trim: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
})


export const Contact = model<TContact>('contact',ContactSchema)