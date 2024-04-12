import {Router} from "express"
import { MerchantController} from "../controller" 

const MerchantRouter = Router();

MerchantRouter.post("/merchants", MerchantController.merchantAccount);

// MerchantRouter.post("/merchants/locations/:merchantId", MerchantController.createLocation);

export default MerchantRouter;