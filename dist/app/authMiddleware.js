"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt from 'jsonwebtoken';
// import config from "../config";
// import { User } from "./modules/users/users.model";
// interface DecodedToken {
//     email: string;
//     iat: number;
//     exp: number;
//   }
// export const accesssToken = async (req: Request, res: Response, next: NextFunction)=>{
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         token = req.headers.authorization.split(" ")[1];
//     }
//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:"You are not authorized"
//         });
//     }
//     try{
//         const decoded = jwt.verify(token,config.jwt as string ) as DecodedToken;
//         req.user = await User.findOne({email: decoded.email}).select('-password');
//         next();
//     }catch(err){
//         return res.status(401).json({
//             success:false,
//             message:"You are not authorized"
//         });
//     }
// }
