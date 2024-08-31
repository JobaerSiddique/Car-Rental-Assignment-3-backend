import { USER_ROLE } from './../users/users.constant';
import express from 'express';
import { BookingController } from './booking.controller';
import Auth from '../../middleware/Auth';

import validationZod from '../../middleware/validatieZod';
import { bookingValidations } from './booking.validation';

const router = express.Router();
router.get('/summery',Auth(USER_ROLE.admin),BookingController.totalSummery)
router.post('/',Auth(USER_ROLE.user),validationZod(bookingValidations.bookingValidationSchema),BookingController.createBooking);
router.get('/my-bookings',Auth(USER_ROLE.user), BookingController.userBooking)
router.get('/admin/all-bookings',Auth(USER_ROLE.admin), BookingController.getAllBooking)
router.put('/approve', BookingController.approveCar)
router.get('/:id',Auth(USER_ROLE.user), BookingController.getSingleBooking)

router.delete('/:id', BookingController.deleteBookings)








export const BookingRoutes = router;