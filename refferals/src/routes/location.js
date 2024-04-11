import {Router} from "express"
import { LocationController} from "../controller" 

const LocationRouter = Router();

LocationRouter.post("/merchants/locations/:merchantId", LocationController.createLocation);

export default LocationRouter;