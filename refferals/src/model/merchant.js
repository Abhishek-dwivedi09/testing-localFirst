const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},
{ timestamps: true }
);  


export default model("Merchant", merchantSchema);