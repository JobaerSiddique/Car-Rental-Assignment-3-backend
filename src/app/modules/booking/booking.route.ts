import { USER_ROLE } from './../users/users.constant';
import express from 'express';
import { BookingController } from './booking.controller';
import Auth from '../../middleware/Auth';

import validationZod from '../../middleware/validatieZod';
import { bookingValidations } from './booking.validation';

const router = express.Router();
router.get('/report', BookingController.reportGenerate)
router.get('/summery',Auth(USER_ROLE.admin),BookingController.totalSummery)
router.post('/',Auth(USER_ROLE.user),validationZod(bookingValidations.bookingValidationSchema),BookingController.createBooking);
router.get('/my-bookings',Auth(USER_ROLE.user), BookingController.userBooking)
router.get('/all-bookings',Auth(USER_ROLE.admin), BookingController.getAllBooking)
router.put('/approve/:id',Auth(USER_ROLE.admin), BookingController.approveCar)
router.get('/:id',Auth(USER_ROLE.user), BookingController.getSingleBooking)
router.delete('/:id',Auth(USER_ROLE.user,USER_ROLE.admin), BookingController.deleteBookings)
router.put('/updateBooking/:id',Auth(USER_ROLE.user,USER_ROLE.admin), BookingController.bookingUpdate)









export const BookingRoutes = router;