import { Merchant, Location, Referral} from "../model";  

/**
 * @typedef {object} refferals
* @property {string} referral_type - referral_type 
* @property {string} referrer_threshold - referrer_threshold
* @property {string} referrer_message - referrer_message
* @property {string} referrer_value - referrer_value
* @property {string} welcome_offer - welcome_offer
* @property {string} ref_status - ref_status
* @property {string} referrer_reward_setup - referrer_reward_setup
* @property {string} referrer_welcome_value_setup - referrer_welcome_value_setup
* @property {string} social_media_banner_msg - social_media_banner_msg
* @property {string} social_media_banner_image - social_media_banner_image
* @property {string} referral_program_launch - referral_program_launch
* @property {string} referral_revenue - referral_revenue
* @property {string}  Referral_Program_set_up -  Referral_Program_set_up
* @property {string} Referral_Program_setup_status - Referral_Program_setup_status 
* @property {string} Location_subscription_status - Location_subscription_status
*/

/**
 * POST /v1/referral/locations/referral-programs
 * @summary create refferral program base on locationId 
 * @tags ReferralProgram 
 * @param {refferals} request.body - reffrals information 
 * @return {object} 200 - Success response - application/json
 */  

 const refferals = async (req,res) => {
    try {
        const {
            referral_type,
            referrer_threshold,
            referrer_message,
            referrer_value,
            welcome_offer,
            ref_status,
            referrer_reward_setup,
            referrer_welcome_value_setup, 
            social_media_banner_msg,
            social_media_banner_image, 
            referral_program_launch,
            referral_revenue,
            Referral_Program_set_up,
            Referral_Program_setup_status,
            Location_subscription_status,

        } = req.body;

        

        const referral = new Referral({
            referral_type,
            referrer_threshold,
            referrer_message,
            referrer_value,
            welcome_offer,
            social_media_banner_image,
            social_media_banner_msg,
            ref_status,
            referrer_reward_setup,
            referrer_welcome_value_setup,
            referral_program_launch,
            referral_revenue,
            Referral_Program_set_up,
            Referral_Program_setup_status,
            Location_subscription_status
            
        });

        await referral.save();

        res.status(201).json({ message: 'Referral created successfully', referral });
    } catch (error) {
        console.error("Error creating referral program:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}  

/**
 * @typedef {object} updateReferral
*/

/**
 * PUT /v1/referral/update-referrals/{referralId}
 * @summary update referral program
 * @tags ReferralProgram
 * @param {string} referralId.path.required - referralId(ObjectId)
 * @param {string} referrer_threshold.query - referrer_threshold
 * @return {object} 200 - Success response - application/json
 */ 

 const updateReferral = async (req,res) => {
    try{
        const {referralId} = req.params;
        const referrer_thresholdParam = req.query.referrer_threshold;
     
        const userToUpdate = await Referral.findById(referralId);
     
     if(!userToUpdate){
      res.status(200).json({error : "referral id  not found"});
     } 
     
     userToUpdate.referrer_threshold = referrer_thresholdParam;
      // Save the updated user
      const updatedReferral = await userToUpdate.save();
     
      res.status(200).json({ message: 'Referral threshold updated successfully', referral: updatedReferral });
       }
        
     catch (error) {
      res.status(500).json({ error: error.message });
     }
 }

export default {
    refferals,
    updateReferral,
  };