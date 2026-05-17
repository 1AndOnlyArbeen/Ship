const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const invitationSchema = new Schema({
  token:      { type: String, unique: true, required: true },
  user_id:    { type: Types.ObjectId, ref: 'User', required: true },
  invited_by: { type: Types.ObjectId, ref: 'User', required: true },
  accepted:   { type: Boolean, default: false },
  expires_at: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Invitation', invitationSchema);
