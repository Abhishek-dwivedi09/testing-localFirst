const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const leadsSchema  = new mongoose.Schema({
    mobileNumber: { type: String, required: true },
    name: { type: String, required: true },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      merchantId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    referralCode: { type: String, required: true, unique: true },
    referred_by: {type: String, required: true },
    refferaal_customer_id :{type: mongoose.Schema.Types.ObjectId,},
    referralProgramId :{type: mongoose.Schema.Types.ObjectId,}

   
}); 


export default model("lead", leadsSchema);