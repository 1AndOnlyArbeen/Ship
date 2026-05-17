const mongoose = require('mongoose');
const { Schema } = mongoose;

const shippingStatusSchema = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('ShippingStatus', shippingStatusSchema);
