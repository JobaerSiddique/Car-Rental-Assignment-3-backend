import { USER_ROLE } from './../users/users.constant';
import express from 'express';
import { CarController } from './cars.controller';
import Auth from '../../middleware/Auth';


console.log("userRole",USER_ROLE);

const router = express.Router();


router.post('/',Auth(USER_ROLE.admin),CarController.createCars)
router.get('/',CarController.getAllCars)
router.get('/:id',CarController.getSingleCar)
router.put('/:id',Auth(USER_ROLE.admin),CarController.updateCar)
router.put('/return',CarController.returnCar)
router.delete('/:id',Auth(USER_ROLE.admin),CarController.deleteCar)




export const CarRoute = router;