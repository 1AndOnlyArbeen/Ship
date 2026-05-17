const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const smsTemplateSchema = new Schema({
  customer_id:     { type: Types.ObjectId, ref: 'User', required: true },
  shipping_method: { type: String, required: true },
  message:         { type: String, required: true },
  status:          { type: Boolean, default: true },
  delivery_type:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SmsTemplate', smsTemplateSchema);
