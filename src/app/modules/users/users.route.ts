import express from 'express'
import { UserController } from './users.controllers';
import { AuthController } from '../Auth/Auth.controllers';

const router = express.Router();


router.post('/signup', UserController.createUser)
router.post('/signin',UserController.SignIn)



export const UserRoute = router;