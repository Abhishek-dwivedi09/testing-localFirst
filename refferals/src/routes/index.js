import { Router } from "express";
import MerchantRouter from "./merchant";
import LocationRouter from "./location";
import ReferralRouter from "./referral";
import CustomerRouter from "./customer";

const router = Router();

router.use("/referral", MerchantRouter);

router.use("/referral", LocationRouter);

router.use("/referral", ReferralRouter);

router.use("/referral", CustomerRouter);


export default router;