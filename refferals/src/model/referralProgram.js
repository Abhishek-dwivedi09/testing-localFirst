const mongoose = require("mongoose");
import { Schema, model } from "mongoose";

const referralSchema = new mongoose.Schema({
    referralProgramId: {
        type: Schema.Types.ObjectId,
        unique: true,
        // Automatically generate a new ID (if you decide to set it explicitly before saving)
      },
  referral_type: { type: String, required: true },
  referrer_threshold: { type: Number, required: true },
  referrer_message: { type: String, required: true },
  referrer_value: { type: String, required: true },
  welcome_offer: { type: String, required: true },
  ref_status: { type: String, enum: ["active", "inactive"], required: true },
  referrer_reward_setup: { type: Boolean, default: false },
  referrer_welcome_value_setup: { type: Boolean, default: false },
  social_media_banner_msg: { type: String, required: true },
  social_media_banner_image: {
    type: String,
    default: null,
  },
  referral_program_launch: { type: Boolean, default: false },
  referral_revenue: { type: Number, required: true },
  Referral_Program_set_up: { type: Boolean, default: false },
  Referral_Program_setup_status: { type: String },
  Location_subscription_status: { type: String },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    default: "6613abc7aee076fce72a23bd",
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    default: "66139f10c7caa7ca24cb88f2",
  },
}); 

referralSchema.index({ referralProgramId: 1 }, { unique: true });

referralSchema.pre('save', function(next) {
  if (!this.referralProgramId) {
    this.referralProgramId = this._id;
  }
  next();
});

export default model("Referral", referralSchema);
