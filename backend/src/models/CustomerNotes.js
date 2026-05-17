const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const customerNotesSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  notes:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CustomerNotes', customerNotesSchema);
