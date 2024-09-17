"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validatieZod_1 = __importDefault(require("../../middleware/validatieZod"));
const router = express_1.default.Router();
router.post('/create-admin', (0, validatieZod_1.default)(admin_validation_1.AdminValidation.createAdminValidation), admin_controller_1.AdminController.createAdmin);
exports.AdminRoute = router;
