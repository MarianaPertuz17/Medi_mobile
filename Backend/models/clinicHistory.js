const mongoose = require("mongoose");
//PUNTO DE REFERENCIA I
const clinicHistorySchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sex: { type: String },
  bornDate: { type: String, required: true },
  ocupation: { type: String },
  country: { type: String, required: true },
  city: { type: String, required: true },
  currentCity: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  pastSurgery: { type: String },
  contactName: { type: String },
  contactLastName: { type: String },
  contactPhone: { type: String },
  docuId: { type: String, required: true, unique: true },
});

module.exports = ClinicHistory = mongoose.model(
  "clinichistorys",
  clinicHistorySchema
);
