const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const webhookLogsSchema = new Schema({
  loggable_id:     { type: Types.ObjectId, required: true },
  loggable_type:   { type: String, required: true },  // 'WooWebsite' | 'WixWebsite' | 'WpSite' | 'ShopifyWebsite'
  url:             { type: String },
  webhook_id:      { type: String },
  signature:       { type: String },
  event:           { type: String },
  resource:        { type: String },
  topic:           { type: String },
  source:          { type: String },
  source_platform: { type: String },
  payload:         { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('WebhookLogs', webhookLogsSchema);
