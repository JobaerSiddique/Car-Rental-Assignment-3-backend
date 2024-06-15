import { USER_ROLE } from './../users/users.constant';
import express from 'express';
import { CarController } from './cars.controller';
import Auth from '../../middleware/Auth';
import validationZod from '../../middleware/validatieZod';
import { carZodValidation } from './car.validation';




const router = express.Router();


router.post('/',Auth(USER_ROLE.admin),validationZod(carZodValidation.carValidator),CarController.createCars)
router.get('/',CarController.getAllCars)
router.get('/:id',CarController.getSingleCar)
router.put('/return',Auth(USER_ROLE.admin),validationZod(carZodValidation.returnCarSchema),CarController.returnCar)
router.put('/:id',validationZod(carZodValidation.updateCarValidator),Auth(USER_ROLE.admin),CarController.updateCar)
router.delete('/:id',Auth(USER_ROLE.admin),CarController.deleteCar)




export const CarRoute = router;