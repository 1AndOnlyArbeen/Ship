const mongoose = require('mongoose');
const { Schema } = mongoose;

const packageSchema = new Schema({
  title:              { type: String, required: true },
  description:        { type: String },
  max_no_of_company:  { type: Number },
  max_no_of_shipping: { type: Number },
  yearly_charge:      { type: Number },
  app_title:          { type: String },
  feature:            { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
