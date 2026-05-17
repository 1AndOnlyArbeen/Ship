const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const shopifyWebsiteSchema = new Schema({
  user_id:                                         { type: Types.ObjectId, ref: 'User' },
  shop:                                            { type: String, unique: true, required: true },
  nonce:                                           { type: String, required: true },
  access_token:                                    { type: String },
  token_expires_at:                                { type: Date },
  locale:                                          { type: String },
  fulfill_order:                                   { type: Boolean, default: false },
  can_fulfill_order:                               { type: Boolean, default: false },
  skip_fulfillment_for_store_pickup:               { type: Boolean, default: false },
  update_order:                                    { type: Boolean, default: true },
  can_update_order:                                { type: Boolean, default: false },
  allow_discount:                                  { type: Boolean, default: false },
  discount:                                        { type: Boolean, default: false },
  allow_automatic_self_pickup:                     { type: Boolean, default: false },
  include_address2_on_note:                        { type: Boolean, default: false },
  automatic_packages_based_on_quantity:            { type: Boolean, default: false },
  no_of_collection_points:                         { type: Number },
  collection_point_rate:                           { type: Number },
  automatic_shipping_status:                       { type: String },
  automatic_shipping_license_id:                   { type: Types.ObjectId, ref: 'License' },
  package_id:                                      { type: Types.ObjectId, ref: 'Package' },
  include_point_code_in_collection_point_response: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('ShopifyWebsite', shopifyWebsiteSchema);
