import { Merchant, Location} from "../model";  

/**
 * @typedef {object} createLocation
 * @property {string} name - name
 * @property {string} address - address
*/

/**
 * POST /v1/referral/merchants/locations/{merchantId}
 * @summary create multipel location
 * @tags Location
 * @param {createLocation} request.body - location 
 * @param {string} merchantId.path.required - merchantId(ObjectId)
 * @return {object} 200 - Success response - application/json
 */ 

const createLocation = async (req,res) => {
   
    try {
        const {merchantId} = req.params;
        const {name,address} = req.body 

        // Check if the merchant exists
        const merchant = await Merchant.findById(merchantId);
        if (!merchant) {
            return res.status(404).json({ error: "Merchant not found" });
        } 

        
        const location = await Location.create({
            merchant: merchantId,
            name,
            address
        }); 
        res.status(201).json(location);
    } catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
} 

export default {
    createLocation,
  };
