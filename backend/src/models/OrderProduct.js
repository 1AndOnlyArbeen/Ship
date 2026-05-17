const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const orderProductSchema = new Schema({
  order_id:     { type: Types.ObjectId, ref: 'Order', required: true },
  product_id:   { type: Types.ObjectId, ref: 'Product', required: true },
  shipping_id:  { type: Types.ObjectId, ref: 'Shipping' },
  line_item_id: { type: String },
  quantity:     { type: Number, default: 1 },
  total:        { type: Number, default: 0 },
  meta:         { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('OrderProduct', orderProductSchema);
