import express from "express";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";
import validationZod from "../../middleware/validatieZod";



const router = express.Router()

router.post('/create-admin',validationZod(AdminValidation.createAdminValidation),AdminController.createAdmin)






export const AdminRoute = router;