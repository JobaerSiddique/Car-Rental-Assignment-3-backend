import { Router } from "express";
import { UserRoute } from "../modules/users/users.route";
import { CarRoute } from "../modules/cars/cars.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { TeamMemberRouter } from "../modules/TeamMember/team.routes";
import { AdminRoute } from "../modules/Admin/admin.routes";
import { PaymentRoute } from "../modules/Payment/payment.route";
import { ReviewRoutes } from "../modules/CustomerReview/Review.Routes";
import { ContactRoutes } from "../modules/Contact/contact.route";


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
    },
    {
        path:'/reviews',
        route: ReviewRoutes
    },
    {
        path:'/teams',
        route: TeamMemberRouter
    },
    {
        path:'/payment',
        route: PaymentRoute
    },
    {
        path:'/contact',
        route: ContactRoutes
    },
    {
        path:'/admin',
        route: AdminRoute
    }
]


moduleRoute.forEach(route=> router.use(route.path,route.route))

export default router;