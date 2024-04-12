const otpService = require('../Service/otpService') 
import { Merchant } from '../model'


/**
* @typedef {object} signUp
* @property {string} phone_number - phone_number
*/

/**
 * POST /v1/merchant/sign-up
 * @summary sign up
 * @tags Merchant
 * @param {signUp} request.body - user information 
 * @return {object} 200 - Success response - application/json
 */   

const signUp = async (req,res) => {
 try { 
    const {phone_number } = req.body;
    if(!phone_number ){
        return res.status(400).send({error:' number  are required'})
    } 

    const status = await otpService.sendOtp(phone_number);
    res.status(200).send({ message: 'OTP sent to the provided phone number.', status });
    
 } catch (error) {
    console.log(error)
 }
} 


/**
* @typedef {object} verifyOtpAndCreateUser 
* @property {string} name - name 
* @property {string} phone_number - phone_number
* @property {string} otp - otp
*/

/**
 * POST /v1/merchant/sign-up/verify-otp
 * @summary verify otp
 * @tags Merchant 
 * @param {verifyOtpAndCreateUser } request.body - user 
 * @return {object} 200 - Success response - application/json
 */   

 const verifyOtpAndCreateUser  = async(req,res) => {
    try {
        const { name, phone_number, otp } = req.body;
        if (!name || !phone_number || !otp) {
          return res.status(400).send({ error: 'Name, phone number, and OTP are required.' });
        }
    
        const isVerified = await otpService.verifyOtp(phone_number, otp);
        if (isVerified) {
          const user = new Merchant({ name, phone_number });
          await user.save();
          res.status(200).send({ message: 'Merchant verified and created successfully.', user });
        } else {
          res.status(400).send({ error: 'Invalid or expired OTP.' });
        }
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).send({ error: 'This phone number is already registered.' });
        }
        res.status(500).send({ error: error.message });
      }
 }   

/**
* @typedef {object} login  
* @property {string} phone_number - phone_number
*/

/**
 * POST /v1/merchant/login
 * @summary login merchant 
 * @tags Merchant 
 * @param {login } request.body - user 
 * @return {object} 200 - Success response - application/json
 */   
   
  const login = async (req,res) => {
    try {
      const { phone_number } = req.body;
      if (!phone_number) {
          return res.status(400).send({ error: 'Phone number is required' });
      }

      // Assuming otpService handles sending OTP and returns a status.
      const status = await otpService.sendOtp(phone_number);
      res.status(200).send({ message: 'OTP sent to the provided phone number.', status });
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred while sending OTP.' });
  }
  } 

/**
* @typedef {object} verifyOtpAndLoginUser   
* @property {string} phone_number - phone_number
* @property {string} otp - otp
*/

/**
 * POST /v1/merchant/login/verify-otp
 * @summary verifu login otp for merchnat
 * @tags Merchant 
 * @param {verifyOtpAndLoginUser} request.body - user 
 * @return {object} 200 - Success response - application/json
*/   


 const verifyOtpAndLoginUser = async (req,res) => {
      try {
        const { phone_number, otp } = req.body;
        if (!phone_number || !otp) {
            return res.status(400).send({ error: 'Phone number and OTP are required.' });
        }

        const isVerified = await otpService.verifyOtp(phone_number, otp);
        if (isVerified) {
            // Assuming User is your user model
            const user = await Merchant.findOne({ phone_number });
            if (!user) {
                return res.status(404).send({ error: 'Merchnat not found.' });
            }
            res.status(200).send({ message: 'Merchant logged in successfully.', user });
        } else {
            res.status(400).send({ error: 'Invalid or expired OTP.' });
        }
      
    } catch (error) {
      res.status(500).json({message:error.message})
    } 

  //   try {
  //     const { otp } = req.body;
  //     if (!otp) {
  //         return res.status(400).send({ error: 'OTP is required.' });
  //     }

  //     // Retrieve the phone number associated with this OTP from your storage
  //     // This is a hypothetical function. You need to implement it based on your storage solution.
  //     const phone_number = await otpService.getPhoneNumberByOtp(otp);

  //     if (!phone_number) {
  //         return res.status(400).send({ error: 'Invalid or expired OTP.' });
  //     }

  //     const isVerified = await otpService.verifyOtp(phone_number, otp);
  //     if (isVerified) {
  //         const user = await Merchant.findOne({ phone_number });
  //         if (!user) {
  //             return res.status(404).send({ error: 'User not found.' });
  //         }
  //         // User is successfully verified
  //         // Implement any additional login logic here, such as generating a token.
  //         res.status(200).send({ message: 'User logged in successfully.', user });
  //     } else {
  //         res.status(400).send({ error: 'Invalid or expired OTP.' });
  //     }
  // } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ error: 'An error occurred during login.' });
  // }
 }

 

 export default {
    signUp,
    verifyOtpAndCreateUser,
    login,
    verifyOtpAndLoginUser,
  };