const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  name:           { type: String, required: true },
  phone:          { type: String, required: true, unique: true },
  remember_token: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);
