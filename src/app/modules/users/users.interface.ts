import { Model } from "mongoose";
import { USER_ROLE } from "./users.constant";

export interface TUsers {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:"user"|"admin",
    phone:string,
    image:string,
    
   
}

// function defination 
export interface UserModel extends Model <TUsers>{
    isUserExistByEmail(email:string):Promise<TUsers>;
    isPasswordMatch(plainTextPassword:string,hashPassword:string):Promise<boolean>;
}


export  type TUserRole = keyof typeof USER_ROLE