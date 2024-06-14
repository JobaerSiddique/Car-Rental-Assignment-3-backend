import catchAsync from "../../utilis/catchAsync";
import { AuthService } from "./Auth.service";


const LoginUser  = catchAsync(async(req,res)=>{
    console.log(req.body);
    const result = await AuthService.loginUser(req.body);
    console.log(result);
})



export const AuthController = {
    LoginUser
}