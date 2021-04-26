const mongoose = require("mongoose");

const userappSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  lastName: { type: String, required: true },
  docuId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  heartFreq: { type: String },
  sugarLevel: { type: String },
  systolicPressure: { type: String },
  diastolicPressure: { type: String },
  weight: { type: String },
  verified: { type: Boolean, default: false },
  historicWeight: { type: Array },
  historicPressure: { type: Array },
  historicSugarLevel: { type: Array },
  historicHeartFreq: { type: Array },
});

module.exports = UserApp = mongoose.model("userapps", userappSchema);
