const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const orderItemSchema = new Schema({
  order_id:          { type: Types.ObjectId, ref: 'Order', required: true },
  product_id:        { type: String, required: true },
  name:              { type: String },
  slug:              { type: String },
  status:            { type: String },
  featured:          { type: String },
  description:       { type: String },
  short_description: { type: String },
  sku:               { type: String },
  price:             { type: String },
  regular_price:     { type: String },
  sale_price:        { type: String },
  total_sales:       { type: String },
  tax_status:        { type: String },
  tax_class:         { type: String },
  virtual:           { type: String },
  downloadable:      { type: String },
  average_rating:    { type: String },
  review_count:      { type: String },
  quantity:          { type: String },
  subtotal:          { type: String },
  subtotal_tax:      { type: String },
  total:             { type: String },
  total_tax:         { type: String },
  image:             { type: String },
  gallery_images:    { type: [String] },
  meta:              { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
