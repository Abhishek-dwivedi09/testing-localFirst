const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const reviewDetailsSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    merchant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    location_name: {
        type: String,
        required: true
    },
    review_description: {
        type: String,
        required: true
    },
    review_star: {
        type: Number,
        required: true
    },
    timing: {
        type: Date,
        required: true
    },
    reviews_by: {
        type: String,
        required: true
    },
    replied_or_not: {
        type: Boolean,
        default: false
    },
    positive: {
        type: Boolean,
        default: false
    },
    negative: {
        type: Boolean,
        default: false
    }
});


// module.exports = User = mongoose.model("users", userSchema); 
export default model("reviewDetails", reviewDetailsSchema);