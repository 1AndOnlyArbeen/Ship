const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const shippingLogSchema = new Schema({
  shipping_id: { type: Types.ObjectId, ref: 'Shipping', required: true },
  status_code: { type: String, required: true },
  status:      { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShippingLog', shippingLogSchema);
