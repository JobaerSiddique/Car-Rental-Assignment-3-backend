import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from "http-status";
import catchAsync from "../utilis/catchAsync"
import config from '../../config';
import { TUserRole } from '../modules/users/users.interface';


const Auth = (...requiredRoles: TUserRole[])=>{
    return catchAsync(async(req,res,next)=>{
        let token: string | undefined;
        
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user Token' });
  }
  // check vaild token 
    jwt.verify(token,config.jwt as string ,function (err,decoded){
        if(err){
            return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user not Verify' });
        }
  
        const role = (decoded as JwtPayload).role;
        
        if(  requiredRoles && !requiredRoles.includes(role) ){
            return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'You are not Authorized User' });
        }
        req.user = decoded as JwtPayload
        next()
       
    })

    })
}


export default Auth;