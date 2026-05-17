const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const pickupLocationsSchema = new Schema({
  company_id:  { type: Types.ObjectId, ref: 'Company', required: true },
  provider_id: { type: Types.ObjectId, ref: 'Provider', required: true },
  locations:   { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PickupLocations', pickupLocationsSchema);
