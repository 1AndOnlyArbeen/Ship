const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const orderSchema = new Schema({
  order_id:               { type: String, required: true },
  order_number:           { type: String },
  order_key:              { type: String },
  currency:               { type: String },
  prices_include_tax:     { type: String },
  discount_total:         { type: String },
  discount_tax:           { type: String },
  shipping_total:         { type: String },
  shipping_tax:           { type: String },
  cart_tax:               { type: String },
  total:                  { type: String },
  total_tax:              { type: String },
  billing:                { type: Schema.Types.Mixed },
  shipping:               { type: Schema.Types.Mixed },
  shipping_lines:         { type: Schema.Types.Mixed },
  payment_method:         { type: String },
  shipping_method:        { type: String },
  billing_phone:          { type: String },
  shipping_phone:         { type: String },
  meta:                   { type: Schema.Types.Mixed },
  source:                 { type: String, default: 'wordpress' },
  automatic_shipment:     { type: Types.ObjectId, ref: 'Shipping' },
  user_id:                { type: Types.ObjectId, ref: 'User' },
  license_id:             { type: Types.ObjectId, ref: 'License' },
  woocommerce_website_id: { type: Types.ObjectId, ref: 'WooWebsite' },
  wix_id:                 { type: Types.ObjectId, ref: 'WixWebsite' },
  wp_site_id:             { type: Types.ObjectId, ref: 'WpSite' },
  shopify_id:             { type: Types.ObjectId, ref: 'ShopifyWebsite' },
  flag_id:                { type: Types.ObjectId, ref: 'Flag' },
  deleted_at:             { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
