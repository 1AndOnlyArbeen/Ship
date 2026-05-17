const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const licenseSchema = new Schema({
  key:               { type: String, required: true, unique: true },
  domain:            { type: String },
  name:              { type: String },
  is_active:         { type: Boolean, default: true },
  multiple_shipment: { type: Boolean, default: true },
  commitment_day:    { type: Number, default: 1 },
  company_id:        { type: Types.ObjectId, ref: 'Company' },
  user_id:           { type: Types.ObjectId, ref: 'User' },
  created_by:        { type: Types.ObjectId, ref: 'User', required: true },
  type_id:           { type: Types.ObjectId, ref: 'LicenseType' },
  started_at:        { type: Date },
  expires_at:        { type: Date },
  deleted_at:        { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('License', licenseSchema);
