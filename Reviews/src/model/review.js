const mongoose = require('mongoose');
import { Schema, model } from "mongoose";

const reviewSchema = new mongoose.Schema({
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
    reviews_count: {
        type: Number,
        default: 0
    },
    reviews_before: {
        type: Number,
        default: 0
    },
    reviews_after: {
        type: Number,
        default: 0
    },
    avg_reviews_week: {
        type: Number,
        default: 0
    },
    reviews_with_localFirst: {
        type: Number,
        default: 0
    },
    avg_rating: {
        type: Number,
        default: 0
    },
    one_star: {
        type: Number,
        default: 0
    },
    two_star: {
        type: Number,
        default: 0
    },
    three_star: {
        type: Number,
        default: 0
    },
    four_star: {
        type: Number,
        default: 0
    },
    five_star: {
        type: Number,
        default: 0
    }
},
{ timestamps: true }
); 



// module.exports = User = mongoose.model("users", userSchema); 
export default model("review", reviewSchema);