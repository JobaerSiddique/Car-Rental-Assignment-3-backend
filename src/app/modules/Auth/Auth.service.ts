import  jwt  from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { User } from "../users/users.model";
import { TLogin } from "./Auth.interface";
import config from '../../../config';



const loginUser = async(payload: TLogin)=>{
    // check if user is exist
    // const isExistUser = await User.findOne({email: payload?.email})
    // if(!isExistUser) {
    //     throw new AppError(httpStatus.NOT_FOUND,"User not found")
    // }
    // // check if password is correct
    // const isPasswordMatch = await bcrypt.compare(payload?.password,isExistUser?.password);
    // if(!isPasswordMatch) {
    //     throw new AppError(httpStatus.NOT_FOUND,"Invalid email or password")
    // }
    const user = await User.findOne({email:payload?.email});
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")

    }
  if(!(await User.isPasswordMatch(payload?.password,user.password))){
    throw new AppError(httpStatus.NOT_FOUND,"Invalid email or password")
  }

  const jwtPayload = {
    userId:user.email,
    role:user.role
  }

  const accesssToken = jwt.sign(jwtPayload, config.jwt as string,{
    expiresIn:"10d"
  })
    return accesssToken;
    
}



export const AuthService = {
  loginUser
}