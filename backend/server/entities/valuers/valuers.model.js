const mongoose = require("mongoose");

const valuerSchema = mongoose.Schema({
  valuer_id: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
  },
  password: { type: String, required: true, select: false },
  name: {
    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true },
  },
  postcodes: [
    { type: String, required: true, trim: true, minlength: 5, maxlength: 5 },
  ],
});

valuerSchema.index({ valuer_id: 1 });

const Valuer = mongoose.model("valuer", valuerSchema);

module.exports = Valuer;
