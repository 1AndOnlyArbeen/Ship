const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const smsSettingSchema = new Schema({
  customer_id: { type: Types.ObjectId, ref: 'User', required: true },
  username:    { type: String, required: true },
  password:    { type: String, required: true },
  sender_name: { type: String, required: true },
  token:       { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SmsSetting', smsSettingSchema);
