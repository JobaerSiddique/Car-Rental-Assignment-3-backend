import  express  from 'express';
import { TeamController } from './team.controller';



const router = express.Router()

router.get('/teamMembers', TeamController.getTeam)




export const TeamMemberRouter = router;