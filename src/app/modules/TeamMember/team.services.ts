import { Team } from "./team.model"






const getTeamMemberbyDB = async()=>{
    const result = await Team.find()
    return result;
}




export const TeamMemberService={
    getTeamMemberbyDB
}