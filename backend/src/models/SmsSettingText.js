const mongoose = require('mongoose');
const { Schema } = mongoose;

const smsSettingTextSchema = new Schema({
  platform: { type: String, required: true },
  message:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SmsSettingText', smsSettingTextSchema);
