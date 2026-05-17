const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const wixWebsiteSchema = new Schema({
  user_id:                              { type: Types.ObjectId, ref: 'User' },
  instance_id:                          { type: String, required: true },
  refresh_token:                        { type: String, required: true },
  domain:                               { type: String },
  per_page_table:                       { type: Number },
  enable_automatic_shipping:            { type: Boolean, default: false },
  fulfill_order:                        { type: Boolean, default: false },
  can_fulfill_order:                    { type: Boolean, default: false },
  can_update_order:                     { type: Boolean, default: false },
  include_address2_on_note:             { type: Boolean, default: false },
  can_use_collection_points:            { type: Boolean, default: false },
  enable_collection_point:              { type: Boolean, default: false },
  allow_discount_on_point:              { type: Boolean, default: false },
  discount_on_distibution_point:        { type: String },
  default_for_collection:               { type: String },
  allow_automatic_self_pickup:          { type: Boolean, default: false },
  automatic_packages_based_on_quantity: { type: Boolean, default: false },
  automatic_shipping_status:            { type: String },
  automatic_shipping_license_id:        { type: Types.ObjectId, ref: 'License' },
  automatic_shipping_data:              { type: Schema.Types.Mixed },
  package_id:                           { type: Types.ObjectId, ref: 'Package' },
}, { timestamps: true });

module.exports = mongoose.model('WixWebsite', wixWebsiteSchema);
