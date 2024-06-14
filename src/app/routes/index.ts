import { Router } from "express";
import { UserRoute } from "../modules/users/users.route";
import { CarRoute } from "../modules/cars/cars.route";
import { BookingRoutes } from "../modules/booking/booking.route";


const router = Router();


const moduleRoute = [
    {
        path:'/auth',
        route: UserRoute
    },
    {
        path:'/cars',
        route: CarRoute
    },
    {
        path:'/bookings',
        route: BookingRoutes
    }
]


moduleRoute.forEach(route=> router.use(route.path,route.route))

export default router;