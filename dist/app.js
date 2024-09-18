"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalHandlerError_1 = __importDefault(require("./app/middleware/globalHandlerError"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://66eb2f3a7ae6548f66cde6de--dapper-nasturtium-bce1b7.netlify.app', 'https://car-rentals-client-assign-5-s32v.vercel.app'];
// Configure CORS
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
// use route
app.use(globalHandlerError_1.default);
app.get('/', (req, res) => {
    res.send('Hurry Car Rental server is Started');
});
// not found route
app.use(notFound_1.default);
exports.default = app;
