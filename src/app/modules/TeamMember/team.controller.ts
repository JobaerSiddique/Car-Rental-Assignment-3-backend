import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { TeamMemberService } from "./team.services";




const getTeam = catchAsync(async(req,res)=>{
    const result  = await TeamMemberService.getTeamMemberbyDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Team Member is retrieved",
        data:result
    })
})





export const TeamController = {
    getTeam
}