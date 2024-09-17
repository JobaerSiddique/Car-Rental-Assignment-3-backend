"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validatieZod_1 = __importDefault(require("../../middleware/validatieZod"));
const contact_validation_1 = require("./contact.validation");
const contact_controller_1 = require("./contact.controller");
const router = express_1.default.Router();
router.post("/", (0, validatieZod_1.default)(contact_validation_1.Contactvalidate.createContactValidate), contact_controller_1.ContactController.createContact);
exports.ContactRoutes = router;
