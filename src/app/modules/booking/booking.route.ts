import express from 'express';
import { BookingController } from './booking.controller';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../users/users.constant';
import validationZod from '../../middleware/validatieZod';
import { bookingValidations } from './booking.validation';

const router = express.Router();

router.post('/',Auth(USER_ROLE.user),validationZod(bookingValidations.bookingValidationSchema) ,BookingController.createBooking);
router.get('/my-bookings',Auth(USER_ROLE.user), BookingController.userBooking)
router.get('/', BookingController.getAllBooking)






export const BookingRoutes = router;