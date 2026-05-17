const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const productSchema = new Schema({
  user_id:                { type: Types.ObjectId, ref: 'User' },
  license_id:             { type: Types.ObjectId, ref: 'License' },
  woocommerce_website_id: { type: Types.ObjectId, ref: 'WooWebsite' },
  product_id:             { type: String, required: true },
  shopify_id:             { type: String },
  name:                   { type: String },
  image:                  { type: String },
  price:                  { type: String },
  sku:                    { type: String },
  variation_id:           { type: String },
  is_virtual:             { type: Boolean, default: false },
  source:                 { type: String },
  meta:                   { type: Schema.Types.Mixed },
  gallery_images:         { type: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
