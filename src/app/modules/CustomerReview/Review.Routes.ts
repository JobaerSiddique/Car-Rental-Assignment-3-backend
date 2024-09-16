import express  from 'express';
import { ReviewController } from './Review.controller';
import validationZod from '../../middleware/validatieZod';
import { ReviewValidation } from './Review.validation';



const router = express.Router();



router.post('/',validationZod(ReviewValidation.createReviewValidation),ReviewController.createReview),
router.get('/',ReviewController.getReview)





export const ReviewRoutes = router;