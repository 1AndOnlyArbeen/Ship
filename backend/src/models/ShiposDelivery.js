const mongoose = require('mongoose');
const { Schema } = mongoose;

const shiposDeliverySchema = new Schema({
  name:     { type: String, required: true },
  provider: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShiposDelivery', shiposDeliverySchema);
