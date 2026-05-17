const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const orderNoteSchema = new Schema({
  order_id: { type: Types.ObjectId, ref: 'Order', required: true },
  content:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderNote', orderNoteSchema);
