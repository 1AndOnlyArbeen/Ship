const mongoose = require('mongoose');
const { Schema } = mongoose;

const providerSchema = new Schema({
  name:      { type: String, required: true },
  endpoints: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);
