import { model, Schema } from "mongoose";

import bcrypt from "bcrypt";
import config from "../../../config";


const AdminSchema =  new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
       
       default:'admin'
    },
    phone:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        trim: true,
    }
},{
    timestamps:true
})


AdminSchema.pre('save', async function (next){
    const user= this;
  user.password = await bcrypt.hash(user.password,Number(config.salt_Rounds) );
  user.confirmPassword=await bcrypt.hash(user.confirmPassword,Number(config.salt_Rounds) );
    next()
})


AdminSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.confirmPassword;
      return ret;
    },
  });

export const Admin = model('User', AdminSchema)