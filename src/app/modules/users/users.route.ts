import express from 'express'
import { UserController } from './users.controllers';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from './users.constant';
import validationZod from '../../middleware/validatieZod';
import { userzodValidation } from './users.validation';



const router = express.Router();


router.post('/signup',validationZod(userzodValidation.userValidation), UserController.createUser)
router.post('/signin',UserController.SignIn)
router.get('/allUser',Auth(USER_ROLE.admin),UserController.AllUsers)
router.put('/updateUser/:id',Auth(USER_ROLE.admin),UserController.UpdateUser)
router.get('/me',Auth(USER_ROLE.user,USER_ROLE.admin),UserController.getMe)
router.put('/update-profile',Auth(USER_ROLE.user,USER_ROLE.admin),validationZod(userzodValidation.updateUserValidation),UserController.userUpdateProfile)
router.delete('/deleteUser/:id',Auth(USER_ROLE.admin),UserController.deleteUser)
router.put('/userStatus/:id',UserController.userStatusUpdate)




export const UserRoute = router;