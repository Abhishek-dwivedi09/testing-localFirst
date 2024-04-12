import {Router} from "express"
import { ReferralController} from "../controller" 

const ReferralRouter = Router();

ReferralRouter.post("/locations/referral-programs", ReferralController.refferals);

ReferralRouter.put("/update-referrals/:referralId", ReferralController.updateReferral)

export default ReferralRouter;