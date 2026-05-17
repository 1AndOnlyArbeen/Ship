const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackerPageSchema = new Schema({
  name:      { type: String, required: true },
  component: { type: String, required: true },
  thumbnail: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('TrackerPage', trackerPageSchema);
