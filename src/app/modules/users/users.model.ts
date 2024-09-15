import { Schema, model } from "mongoose";
import { TUsers, UserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<TUsers, UserModel>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    role:{
        type:String,
       enum:['user', 'admin'],
       default:'user'
    },
    phone:{
        type:String,
        required:true
    },
    address:{
      type:String,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    isDelete:{
      type:Boolean,
      default: false
    },
    status:{
      type:String,
      enum:['active', 'block'],
      default:'active'
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordChangeCount: 
    { type: Number, 
      default: 0 }
   
},{
    timestamps:true
})


userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, Number(config.salt_Rounds));
  }

  // No need to hash confirmPassword or store it in the database
  user.confirmPassword = undefined;

  next();
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.confirmPassword;
      return ret;
    },
  });


  userSchema.statics.isUserExistByEmail = async function(email:string){
    return await User.findOne({ email: email});
  }

  userSchema.statics.isPasswordMatched = async function(plainTextPassword,hashPassword){
    return await bcrypt.compare(plainTextPassword,hashPassword)
  }
export const User = model<TUsers,UserModel>("User",userSchema)