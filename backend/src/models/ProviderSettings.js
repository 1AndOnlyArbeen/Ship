const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const providerSettingsSchema = new Schema({
  company_id:  { type: Types.ObjectId, ref: 'Company', required: true },
  provider_id: { type: Types.ObjectId, ref: 'Provider', required: true },
  settings:    { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ProviderSettings', providerSettingsSchema);
