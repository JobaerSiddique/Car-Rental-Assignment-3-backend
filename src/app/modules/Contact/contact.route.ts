import  express  from 'express';
import validationZod from '../../middleware/validatieZod';
import { Contactvalidate } from './contact.validation';
import { ContactController } from './contact.controller';



const router = express.Router();


router.post("/",validationZod(Contactvalidate.createContactValidate),ContactController.createContact)



export const ContactRoutes = router;