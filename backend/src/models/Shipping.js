const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const shippingSchema = new Schema({
  uuid:                { type: String },
  short_tracking_code: { type: String },
  shipping_code:       { type: String, required: true },
  is_active:           { type: Boolean, default: true },
  label_generated:     { type: Boolean, default: false },
  type:                { type: String },
  first_name:          { type: String },
  last_name:           { type: String },
  company:             { type: String },
  address_1:           { type: String },
  address_2:           { type: String },
  street_number:       { type: String },
  city:                { type: String },
  state:               { type: String },
  postcode:            { type: String },
  country:             { type: String },
  phone:               { type: String },
  product_ids:         { type: String },
  meta:                { type: Schema.Types.Mixed },
  shipment_data:       { type: Schema.Types.Mixed },
  response:            { type: Schema.Types.Mixed },
  status:              { type: Schema.Types.Mixed },
  order_id:            { type: Types.ObjectId, ref: 'Order', required: true },
  provider_id:         { type: Types.ObjectId, ref: 'Provider' },
  license_id:          { type: Types.ObjectId, ref: 'License' },
  flag_id:             { type: Types.ObjectId, ref: 'Flag' },
}, { timestamps: true });

module.exports = mongoose.model('Shipping', shippingSchema);
