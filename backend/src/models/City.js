const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  city_code: { type: String, required: true, unique: true },
  city_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
