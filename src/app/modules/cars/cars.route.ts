import express from 'express';
import { CarController } from './cars.controller';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../users/users.constant';

console.log("userRole",USER_ROLE);

const router = express.Router();


router.post('/',Auth(USER_ROLE.admin),CarController.createCars)
router.get('/',CarController.getAllCars)
router.get('/:id',CarController.getSingleCar)



export const CarRoute = router;