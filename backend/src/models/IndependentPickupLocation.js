const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const independentPickupLocationSchema = new Schema({
  user_id:   { type: Types.ObjectId, ref: 'User', required: true },
  locations: { type: Schema.Types.Mixed, required: true },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('IndependentPickupLocation', independentPickupLocationSchema);
