"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Review_controller_1 = require("./Review.controller");
const validatieZod_1 = __importDefault(require("../../middleware/validatieZod"));
const Review_validation_1 = require("./Review.validation");
const router = express_1.default.Router();
router.post('/', (0, validatieZod_1.default)(Review_validation_1.ReviewValidation.createReviewValidation), Review_controller_1.ReviewController.createReview),
    router.get('/', Review_controller_1.ReviewController.getReview);
exports.ReviewRoutes = router;
