"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = require("../modules/users/users.route");
const cars_route_1 = require("../modules/cars/cars.route");
const booking_route_1 = require("../modules/booking/booking.route");
const team_routes_1 = require("../modules/TeamMember/team.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const payment_route_1 = require("../modules/Payment/payment.route");
const Review_Routes_1 = require("../modules/CustomerReview/Review.Routes");
const contact_route_1 = require("../modules/Contact/contact.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/auth',
        route: users_route_1.UserRoute
    },
    {
        path: '/cars',
        route: cars_route_1.CarRoute
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes
    },
    {
        path: '/reviews',
        route: Review_Routes_1.ReviewRoutes
    },
    {
        path: '/teams',
        route: team_routes_1.TeamMemberRouter
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoute
    },
    {
        path: '/contact',
        route: contact_route_1.ContactRoutes
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoute
    }
];
moduleRoute.forEach(route => router.use(route.path, route.route));
exports.default = router;
