import { Router } from "express";
import ReviewRouter from "./review";

const router = Router();


router.use("/review", ReviewRouter);


export default router;