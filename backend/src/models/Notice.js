const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticeSchema = new Schema({
  site_notice:        { type: String },
  display_in_site:    { type: Boolean, default: false },
  wp_notice:          { type: String },
  display_in_wp:      { type: Boolean, default: false },
  shopify_notice:     { type: String },
  display_in_shopify: { type: Boolean, default: false },
  wix_notice:         { type: String },
  display_in_wix:     { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
