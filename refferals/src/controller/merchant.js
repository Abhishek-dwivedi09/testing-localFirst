import { Merchant, Location} from "../model";  

/**
 * @typedef {object} merchantAccount
 * @property {string} name - name

 */

/**
 * Post /v1/referral/merchants
 * @summary create merchant accounts
 * @param {merchantAccount} request.body - merchant account
 * @tags Merchants
 * @return {object} 200 - Success response - application/json
 */ 

 const merchantAccount = async(req,res) => {
    try {
        const {name} = req.body; 
        const merchant = await Merchant.create({name})

    } catch (error) {
        console.error("Error creating merchant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
 }    

// /**
//  * @typedef {object} user
//  * @property {string} merchantName - merchantName
//  * @property {string} location - location
//  * @property {string} referralType - referralType
//  * @property {string} referralThreshold - referralThreshold
//  * @property {string} referralMessage -  referralMessage
//  * @property {string} referralValue - referralValue
//  * @property {string} refereeBenefit - refereeBenefit
//  * @property {string} numberOfReferralLinks - numberOfReferralLinks
//  * @property {string} referralRewardSetup - referralRewardSetup
//  * @property {string} refereeWelcomeValueSetup - refereeWelcomeValueSetup
//  * @property {string} referralSocialMediaBanner - referralSocialMediaBanner
//  * @property {string} referralProgramLaunch - referralProgramLaunch
//  * @property {string} referralRevenue - referralRevenue
// */

// /**
//  * Post /v1/referral/merchants
//  * @summary user create account
//  * @tags Merchant
//  * @param {user} request.body.required - User info - multipart/form-data
//  * @return {object} 200 - Success response - application/json
//  */   

//   const merchantAccount = async (req,res) => {
//     try {
//         const {
//             merchantName,
//             location,
//             referralType,
//             referralThreshold,
//             referralMessage,
//             referralValue,
//             refereeBenefit,
//             numberOfReferralLinks,
//             referralRewardSetup,
//             refereeWelcomeValueSetup,

//             referralSocialMediaBanner,
//             referralProgramLaunch,
//             referralRevenue
//         } = req.body; 

//         const newMerchant = new Merchant({
//             merchantName,
//             location,
//             referral: {
//                 referralType,
//                 referralThreshold,
//                 referralMessage,
//                 referralValue,
//                 refereeBenefit,
//             numberOfReferralLinks,
//             referralRewardSetup,
//             refereeWelcomeValueSetup,
//             referralSocialMediaBanner,
//             referralProgramLaunch,
//             referralRevenue
//             },
//         }) 
//         const savedMerchant = await newMerchant.save();
//         res.status(201).json(savedMerchant);
//     } catch (error) {
    
//         console.error('Error creating merchant:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

//   }




 export default {
    merchantAccount,
  };


