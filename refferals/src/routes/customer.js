import {Router} from "express"
import { CustomersController} from "../controller" 

const CustomerRouter = Router();

CustomerRouter.post("/customers", CustomersController.customers);

CustomerRouter.get("/customers-data", CustomersController.getDetails);

CustomerRouter.post("/leads", CustomersController.leads);

CustomerRouter.get("/leads-data", CustomersController.getLeadsData);

export default CustomerRouter;