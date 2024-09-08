const mongoose = require("mongoose");
const partenaireSchema = new mongoose.Schema(
  {
    nom_partenaire: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
     
    },

  },
  {
    timestamps: true,
  }
);
const Partenaire = mongoose.model("Partenaire", partenaireSchema);
module.exports = Partenaire;
