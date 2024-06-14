"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = require("../modules/users/users.route");
const cars_route_1 = require("../modules/cars/cars.route");
const booking_route_1 = require("../modules/booking/booking.route");
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
    }
];
moduleRoute.forEach(route => router.use(route.path, route.route));
exports.default = router;
