const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const wpSiteSchema = new Schema({
  user_id:                              { type: Types.ObjectId, ref: 'User', required: true },
  store:                                { type: String, required: true },
  key_id:                               { type: String, required: true },
  consumer_key:                         { type: String, required: true },
  consumer_secret:                      { type: String, required: true },
  suffix:                               { type: String },
  enable_automatic_shipping:            { type: Boolean, default: false },
  enable_different_shipping_method:     { type: Boolean, default: false },
  automatic_shipping_methods_and_licenses: { type: Schema.Types.Mixed },
  automatic_shipping_status:            { type: String },
  shipos_settings:                      { type: Schema.Types.Mixed },
  allow_automatic_self_pickup:          { type: Boolean, default: false },
  self_pickup_method_title:             { type: String },
  self_pickup_button_text:              { type: String },
  automatic_packages_based_on_quantity: { type: Boolean, default: false },
  order_sync_status:                    { type: String },
  update_order_status:                  { type: Boolean, default: false },
  display_total_shipment:               { type: Boolean, default: false },
  shipping_multiple_option:             { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('WpSite', wpSiteSchema);
