import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../Error/AppError';
import { TUsers } from './users.interface';
import { User } from './users.model';
import config from '../../../config';



const createUserIntoDB = async(payload:TUsers)=>{
   const emailExist = await User.findOne({ email: payload.email})
    if(emailExist){
        throw new AppError(httpStatus.BAD_REQUEST,"Email already exist")
    }
    const result = await User.create(payload);
    return result;  
}

const signInUser = async(payload:TUsers)=>{
    const findUser = await User.findOne({email:payload.email});
    
    if(!findUser){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }
    const matchPassword = await bcrypt.compare(payload.password,findUser.password,)
    if(!matchPassword){
        throw new AppError(httpStatus.NOT_FOUND,"Invalid email or password")
    }
    const jwtPayload={
        userId : findUser?._id,
        role: findUser?.role
    }
    
    const token = jwt.sign(jwtPayload, config.jwt as string ,{
        expiresIn:"10d"
    }) 

    const result = {
        success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
      phone: findUser.phone,
      address: findUser.address,
      
    },
    token
    }

    return result;

}

export const UserService = {
    createUserIntoDB,
    signInUser
}