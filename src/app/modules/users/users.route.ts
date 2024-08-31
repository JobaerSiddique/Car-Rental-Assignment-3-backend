import express from 'express'
import { UserController } from './users.controllers';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from './users.constant';



const router = express.Router();


router.post('/signup', UserController.createUser)
router.post('/signin',UserController.SignIn)
router.get('/allUser',UserController.AllUsers)
router.put('/updateUser/:id',UserController.UpdateUser)
router.get('/me',Auth(USER_ROLE.user,USER_ROLE.admin),UserController.getMe)




export const UserRoute = router;