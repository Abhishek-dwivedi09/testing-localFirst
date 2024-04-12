import {Router} from "express"
import { MerchantController } from "../controller" 

const MerchantRouter = Router();

MerchantRouter.post("/sign-up", MerchantController.signUp);

MerchantRouter.post("/sign-up/verify-otp", MerchantController.verifyOtpAndCreateUser);

MerchantRouter.post("/login", MerchantController.login)

MerchantRouter.post("/login/verify-otp", MerchantController.verifyOtpAndLoginUser)


export default MerchantRouter;