const Product = require("../model/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Récupération de tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un produit
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // Code de statut 201 pour la création
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// recupérer un seul produit
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie si l'ID du produit est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID du produit invalide" });
    }

    // Recherche du produit et population du partenaire
    const product = await Product.findById(id).populate("Partenaire");

    if (!product) {
      return res
        .status(404)
        .json({ message: `Produit non trouvé avec l'ID ${id}` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a products
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Mise à jour du produit et retour du produit mis à jour
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: `Aucun produit trouvé avec l'ID ${id}` });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with Id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
