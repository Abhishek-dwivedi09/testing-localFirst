import { Router } from "express";
import MerchantRouter from "./merchant";

const router = Router();



router.use("/merchant", MerchantRouter);


export default router;