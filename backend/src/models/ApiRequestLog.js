const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const apiRequestLogSchema = new Schema({
  license_id:       { type: Types.ObjectId, ref: 'License' },
  description:      { type: String },
  request_url:      { type: String },
  request_data:     { type: String },
  request_header:   { type: String },
  api_request_url:  { type: String },
  api_request_data: { type: String },
  api_response:     { type: String },
  response:         { type: String },
  order_number:     { type: String },
  shipping_number:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ApiRequestLog', apiRequestLogSchema);
