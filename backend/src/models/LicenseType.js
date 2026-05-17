const mongoose = require('mongoose');
const { Schema } = mongoose;

const licenseTypeSchema = new Schema({
  name:  { type: String, required: true },
  value: { type: Number, required: true },
}, { timestamps: false });

module.exports = mongoose.model('LicenseType', licenseTypeSchema);
