const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const pickupPointStatusSchema = new Schema({
  license_id:     { type: Types.ObjectId, ref: 'License', required: true },
  station_number: { type: String, required: true },
  is_active:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('PickupPointStatus', pickupPointStatusSchema);
