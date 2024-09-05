const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    nom_produit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    prix: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Partenaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partenaire",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
