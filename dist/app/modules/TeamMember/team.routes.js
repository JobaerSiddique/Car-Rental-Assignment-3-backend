"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberRouter = void 0;
const express_1 = __importDefault(require("express"));
const team_controller_1 = require("./team.controller");
const router = express_1.default.Router();
router.get('/teamMembers', team_controller_1.TeamController.getTeam);
exports.TeamMemberRouter = router;
