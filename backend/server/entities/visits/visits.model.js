const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
  visit_date: { 
    type: Date, 
    required: true 
  },
  valuer_ObjectId: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: "valuer" 
  },
  proceeding_ObjectId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "proceeding",
  },
  valued: {
    type: String,
    enum: ["Pendent", "Sí", "No"],
    required: true,
    default: "Pendent",
  },
});

visitSchema.index({ visit_date: 1 });

const Visit = mongoose.model("visit", visitSchema);

module.exports = Visit;
