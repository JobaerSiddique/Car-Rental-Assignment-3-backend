import express from 'express';
import { BookingController } from './booking.controller';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../users/users.constant';

const router = express.Router();

router.post('/',Auth(USER_ROLE.user), BookingController.createBooking);
router.get('/my-bookings',Auth(USER_ROLE.user), BookingController.userBooking)






export const BookingRoutes = router;