const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const shippingNoteSchema = new Schema({
  shipping_id: { type: Types.ObjectId, ref: 'Shipping', required: true },
  content:     { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShippingNote', shippingNoteSchema);
