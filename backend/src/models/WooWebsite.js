const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const wooWebsiteSchema = new Schema({
  user_id:         { type: Types.ObjectId, ref: 'User', required: true },
  url:             { type: String, required: true },
  consumer_key:    { type: String, required: true },
  consumer_secret: { type: String, required: true },
  name:            { type: String },
}, { timestamps: true });

module.exports = mongoose.model('WooWebsite', wooWebsiteSchema);
