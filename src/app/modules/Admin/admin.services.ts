import httpStatus from "http-status"
import AppError from "../Error/AppError"
import { User } from "../users/users.model"




const createAdminIntoDB = async(payload:string)=>{
    const email = payload.email

const user = await User.findOne({ email: email})
if(user){
    throw new AppError(httpStatus.BAD_REQUEST,"Admin Already Exists")
}

  if(payload.password !== payload.confirmPassword){
    throw new AppError(httpStatus.BAD_REQUEST,"Password does not match")
  }
  payload.role="admin"
  const result = await User.create(payload)
  return result
}





export const AdminService = {
    createAdminIntoDB
}