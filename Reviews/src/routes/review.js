import {Router} from "express"
import { ReviewController } from "../controller" 

const ReviewRouter = Router();

ReviewRouter.get("/review-data", ReviewController.review);

export default ReviewRouter;