const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const customerSchema  = new mongoose.Schema({
    mobileNumber: { type: String, required: true },
    customerName: { type: String, required: true },
    referralCode: { type: String,  unique: true },
    billingAmount: { type: Number, required: true },
   
}); 


export default model("Customer", customerSchema);