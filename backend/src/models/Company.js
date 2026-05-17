const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const companySchema = new Schema({
  name:                          { type: String, required: true },
  email:                         { type: String },
  description:                   { type: String },
  phone:                         { type: String },
  domain:                        { type: String },
  api_url:                       { type: String },
  service_url:                   { type: String },
  service_code:                  { type: String },
  service_username:              { type: String },
  service_password:              { type: String },
  logo:                          { type: String },
  license_quota:                 { type: Number, default: 0 },
  is_premium:                    { type: Boolean, default: false },
  display_company_logo_on_label: { type: Boolean, default: false },
  provider_id:                   { type: Types.ObjectId, ref: 'Provider' },
  provider:                      { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
