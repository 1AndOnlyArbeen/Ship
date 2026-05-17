const mongoose = require('mongoose');
const { Schema } = mongoose;

const flagSchema = new Schema({
  color: { type: String },
  order: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Flag', flagSchema);
