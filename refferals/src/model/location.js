const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const locationSchema  = new mongoose.Schema({
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    referralPrograms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReferralProgram'
    }],
}); 


export default model("Location", locationSchema);