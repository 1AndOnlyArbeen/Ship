const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const shiposDeliveryMailTemplateSchema = new Schema({
  shipos_delivery_id: { type: Types.ObjectId, ref: 'ShiposDelivery', required: true },
  message:            { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShiposDeliveryMailTemplate', shiposDeliveryMailTemplateSchema);
