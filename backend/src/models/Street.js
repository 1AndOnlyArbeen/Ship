const mongoose = require('mongoose');
const { Schema } = mongoose;

const streetSchema = new Schema({
  city_code:   { type: String, required: true },
  street_code: { type: String, required: true },
  street_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Street', streetSchema);
