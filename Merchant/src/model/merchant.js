const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
},
); 

export default model("user", merchantSchema);