import { model, Schema } from "mongoose";



 const TeamSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    position:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
        trim: true,
    }
})


export  const Team =  model('teams', TeamSchema)

