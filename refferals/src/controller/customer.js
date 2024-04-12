import {Customers,Referral,Lead} from "../model"; 
const twilio = require('twilio');
require("dotenv").config(); 
const mongoose = require('mongoose');

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)


/**
* @typedef {object} customers
* @property {string} mobileNumber - mobileNumber
* @property {string} customerName - customerName
* @property {string} billingAmount - billingAmount
* @property {string} sendReferralRequest - sendReferralRequest
* @property {string} requestGoogleReview - requestGoogleReview

*/

/**
 * POST /v1/referral/customers
 * @summary create customer account 
 * @tags Customers
 * @param {customers} request.body - customers
 * @return {object} 200 - Success response - application/json
 */   
  

 const customers = async (req,res) => {
  try { 
    const {mobileNumber, customerName, billingAmount, sendReferralRequest, requestGoogleReview} = req.body 

    let referralCode;

    if (sendReferralRequest === 'true' ) { 
        referralCode = generateReferralCode();
        const referralLink = generateReferralLink(referralCode);
        const message = `Thanks for visiting Pk Luxury Saloon four times so far, ${customerName}! Hope we did a good job!.
        Can you  Please refer your friends to our salon and get referral credits for each referral?. Click here to refer: ${referralLink}`;
          
         
        const newCustomer = new Customers({
            mobileNumber,
            customerName,
            billingAmount,
            referralCode
        });
        await newCustomer.save();

        sendSMS(mobileNumber, message);

        res.json({ success: true, message: message });
    } else if (requestGoogleReview === 'true'){ 
        const reviewMessage = `Thanks for visiting Pk Luxury Saloon, ${customerName}! We hope you enjoyed our services.
         We would love it if you could leave us a review on Google. Your feedback is invaluable to us!`; 

         const newCustomer = new Customers({
            mobileNumber,
            customerName,
            billingAmount,
        }); 
        await newCustomer.save();

        sendSMS(mobileNumber, reviewMessage);


        res.json({ success: true, message: reviewMessage });
    }else {
        res.json({ success: false, message: 'Referral request not sent. Ensure sendReferralRequest and mobileNumber are provided.' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
 }  

 // function to generate refferal link 
 
 function generateReferralLink(referralCode){
    const merchantId = "66139f10c7caa7ca24cb88f2";
    const locationId = "6613abc7aee076fce72a23bd";
    const referralProgramId = "661633c6b889dc6c8187915a"; 


    console.log(referralCode)
    

    return `http://localFirst.com/referral?rId=${referralProgramId}&referralCode=${referralCode}`; 
   // http://localFirst.com/referral?mId=${merchantId}&liD=${localId}&referralId=${referralId}&referralCode=${referralCode} 
   // referal program id
} 


 // Function to generate random referral code
function generateReferralCode() {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
}

 

// Function to send SMS using Twilio
function sendSMS(mobileNumber, message) { 
    console.log("Sending SMS to:", mobileNumber);
    console.log("Message:", message);
    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_FROM_NUMBER,
            to: mobileNumber
        })
        .then(message => console.log(`SMS sent: ${message.sid}`))
        .catch(error => console.error(`Error sending SMS: ${error.message}`));
}   

/**
 * @typedef {object} getDetails
*/

/**
 * GET /v1/referral/customers-data
 * @summary get the data of customer 
 * @tags Customers
 * @param {string} referralProgramId.query - referralProgramId
 * @param {string} referralCode.query - referralCode
 * @return {object} 200 - Success response - application/json
 */ 

  const getDetails = async (req,res) => {
    try {
        const { referralProgramId, referralCode } = req.query;

        const referral = await Referral.findOne({_id:referralProgramId});
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found.' });
        }

        const { locationId, merchantId,social_media_banner_image,social_media_banner_msg } = referral;

    
        const customer = await Customers.findOne({ referralCode });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        } 
        const { _id: customerId } = customer;

        res.json({
            merchantId,
            locationId,
            social_media_banner_image,
            social_media_banner_msg,
            customerId, 
            referralCode
        });
    } catch (error) {
        console.error("Error fetching referral details:", error);
        res.status(500).json({ message: 'Internal server error' });
    }

    
  }  

/**
* @typedef {object} leads
* @property {string} mobileNumber - mobileNumber
* @property {string} name - name
* @property {string} locationId - locationId
* @property {string} merchantId - merchantId
* @property {string} referralCode - referralCode
* @property {string} referralProgramId - referralProgramId
* @property {string} referral_customer_id - referral_customer_id

*/

/**
 * POST /v1/referral/leads
 * @summary create leads account 
 * @tags Customers
 * @param {leads} request.body - customers
 * @return {object} 200 - Success response - application/json
 */   

 const leads  = async (req,res) =>{
    try { 
        const {
            mobileNumber,
            name,
            locationId,
            merchantId,
            referralCode,
            referralProgramId,
            referral_customer_id
        } = req.body;   

        // Assume Customer is your customer model and it has a 'referralCode' field
    const referringCustomer = await Customers.findOne({ referralCode: referralCode });
    if (!referringCustomer) {
        return res.status(404).json({ message: 'Referring customer not found' });
    }


        const lead = new Lead({
            mobileNumber,
            name,
            locationId: new mongoose.Types.ObjectId(locationId), 
            merchantId: new mongoose.Types.ObjectId(merchantId), 
            referralProgramId: new  mongoose.Types.ObjectId(referralProgramId),
            referralCode,
            referred_by: referringCustomer.name,
            referred_by,
            referral_customer_id: new mongoose.Types.ObjectId(referral_customer_id)
        }) 

        await lead.save();
       res.status(200).json(lead)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
    
 } 


 /**
 * @typedef {object} getLeadsData
*/

/**
 * GET /v1/referral/leads-data
 * @summary get the data of leads
 * @tags Customers
 * @param {string} merchantId.query - merchantId
 * @return {object} 200 - Success response - application/json
 */  

const getLeadsData = async (req,res) => {
    try { 
        const {merchantId} = req.query; 
        
        const leads = await Lead.findOne({merchantId: new mongoose.Types.ObjectId(merchantId)}); 

        if(!leads){
            res.status(400).json({message:"leads not found"});
        }  

        const {referralCode, referralProgramId, locationId} = leads ; 

         res.status(200).json({
            locationId, 
            referralProgramId
         })
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

 

export default {
    customers,
    getDetails,
    leads,
    getLeadsData,
  };



  