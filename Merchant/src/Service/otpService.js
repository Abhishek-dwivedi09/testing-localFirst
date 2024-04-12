const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send an OTP to a phone number
exports.sendOtp = async (phoneNumber) => {
  try{
    const serviceSid = process.env.TWILIO_SERVICE_SID; 
  const otp = await client.verify.services(serviceSid).verifications.create({
    to: phoneNumber,
    channel: 'sms'
  });

  return otp.status;
  }
  catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error('Failed to send OTP');
  }
};


exports.verifyOtp = async (phoneNumber, otp) => {
  const serviceSid = process.env.TWILIO_SERVICE_SID; 
  const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({
    to: phoneNumber,
    code: otp
  });

  return verificationCheck.status === 'approved'; 
}; 

// Simple in-memory store for OTPs
// let otpStore = {};

// Function to send an OTP to a phone number
// exports.sendOtp = async (phoneNumber) => {
//   try {
//     const serviceSid = process.env.TWILIO_SERVICE_SID; 
//     const otpResponse = await client.verify.services(serviceSid).verifications.create({
//       to: phoneNumber,
//       channel: 'sms'
//     });

//     // Assuming the OTP can be retrieved or generated here. If not, ignore this step.
//     // This is just a placeholder as Twilio does not return the OTP itself for security reasons.
//     // You might store a hash or another identifier that maps to the phoneNumber.
//     const otp = otpResponse.sid; // This is NOT the actual OTP. You need a way to map verification SID or another identifier to the phoneNumber.
//     otpStore[otp] = { phoneNumber, expires: Date.now() + 1000 * 60 * 10 }; // Expires in 10 minutes

//     return otpResponse.status;
//   }
//   catch (error) {
//     console.error("Error sending OTP:", error);
//     throw new Error('Failed to send OTP');
//   }
// };

// exports.verifyOtp = async (phoneNumber, otp) => {
//   const serviceSid = process.env.TWILIO_SERVICE_SID; 
//   const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({
//     to: phoneNumber,
//     code: otp
//   });

//   return verificationCheck.status === 'approved'; 
// };

// exports.getPhoneNumberByOtp = async (otp) => {
//   const otpEntry = otpStore[otp];
//   if (!otpEntry || otpEntry.expires < Date.now()) {
//     // OTP not found or expired
//     return null;
//   }

//   return otpEntry.phoneNumber;
// };
