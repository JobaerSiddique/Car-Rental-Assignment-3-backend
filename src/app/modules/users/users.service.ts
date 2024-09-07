import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../Error/AppError';
import { TUsers } from './users.interface';
import { User } from './users.model';
import config from '../../../config';
import { createToken, verifyToken } from './users.utils';



const createUserIntoDB = async(payload:TUsers)=>{
   const emailExist = await User.findOne({ email: payload.email})
    if(emailExist){
        throw new AppError(httpStatus.BAD_REQUEST,"Email already exist")
    }
    if(payload.password !== payload.confirmPassword){
        throw new AppError(httpStatus.BAD_REQUEST,"Password does not match")
    }
    const result = await User.create(payload);
    return result;  
}

const signInUser = async(payload:TUsers)=>{
    const user = await User.findOne({email:payload.email});
    
    if(!user ){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }
    if(user.isDelete){
        throw new AppError(httpStatus.FORBIDDEN,"User have no access")
    }
    const matchPassword = await bcrypt.compare(payload.password,user .password,)
    console.log({matchPassword});
    if(!matchPassword){
        throw new AppError(httpStatus.NOT_FOUND,"Invalid email or password")
    }
    const jwtPayload={
        userId : user ?._id,
        role: user ?.role
    }
    
    const accessToken = createToken(
        jwtPayload,
        config.jwt as string,
        config.accessTokenExpires as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.RefreshToken as string,
        config.refreshTokenExpires as string
    );

    

    
    

    return {user ,accessToken,refreshToken};

}

const getMeDB = async (userId:string,role:string)=>{

let result = null

if(role ){
  result = await User.findById({_id:userId})
}
 return result

}

const AllUserDB = async (page:number,limit:number) => {
    console.log(page,limit);
    const skip = (page - 1) * limit;
    // console.log(skip);
    const result = await User.find({}).skip(skip).limit(limit);
    const totalUser = await User.countDocuments({});
    // console.log(totalUser,limit);
    const totalPages= Math.ceil(totalUser / limit)
    console.log(result,totalPages);
    return {result,totalPages};
  };

const UpdateUserDB = async(id:string)=>{

    const result = await User.findById(id);
   
    if(result.role === 'admin'){
        throw new AppError(httpStatus.FORBIDDEN,"Admin can't update their role")
    }
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }
    
    result.role = 'admin'
    await result.save()
    return result;
}
const UpdateUserStatusDB = async(id:string,payload:any)=>{
console.log({id});
    const result = await User.findById(id);
   console.log({result});
    if(result.role === 'admin'){
        throw new AppError(httpStatus.FORBIDDEN,"Admin can't update their role")
    }
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }
    
    result.status = payload
    await result.save()
    // return result;
    console.log(result);
}
const deleteUserDB = async(id:string)=>{
    const user = await User.findById(id);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }

    if(user.isDelete){
        throw new AppError(httpStatus.FORBIDDEN,"User is Already deleted")
    }
    const result = await User.findByIdAndUpdate(id,{isDelete:true})
    
    return result
}


const userUpdateProfileDB = async(id:string,payload:any)=>{
    const user = await User.findById(id)
    console.log({payload});
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"User not found")
    }
    if(user.isDelete){
        throw new AppError(httpStatus.FORBIDDEN,"User is deleted")
    }
    const result = await User.findByIdAndUpdate(id,payload)
    console.log(result);
    return result


}
export const UserService = {
    createUserIntoDB,
    signInUser,
    getMeDB,
    AllUserDB,
    UpdateUserDB,
    deleteUserDB,
    userUpdateProfileDB,
    UpdateUserStatusDB


}