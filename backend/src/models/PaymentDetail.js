const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const paymentDetailSchema = new Schema({
  user_id:             { type: Types.ObjectId, ref: 'User', required: true },
  plan_expiry_date:    { type: Date, required: true },
  token:               { type: String, required: true },
  icount_user_details: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('PaymentDetail', paymentDetailSchema);
