const mongoose = require('mongoose');
const { Schema } = mongoose;

const cityEnHeSchema = new Schema({
  city_name_en: { type: String, required: true },
  city_name_he: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CityEnHe', cityEnHeSchema);
