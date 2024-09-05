const Partenaire = require("../model/partenaire");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Récupération de tous les partenaire
router.get("/", async (req, res) => {
  try {
    const partenaires = await Partenaire.find({});
    res.status(200).json(partenaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//
router.post("/", async (req, res) => {
  try {
    const partenaire = await Partenaire.create(req.body);
    res.status(201).json(partenaire); // Code de statut 201 pour la création
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// recupérer un seul partenaire
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie si l'ID du partenaire est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID du partenaire invalide" });
    }

    // Recherche du partenaire et population du partenaire
    const partenaire = await Partenaire.findById(id).populate("partenaires");

    if (!partenaire) {
      return res
        .status(404)
        .json({ message: `partenaire non trouvé avec l'ID ${id}` });
    }

    res.status(200).json(partenaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a partenaires
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Mise à jour du partenaire et retour du partenaire mis à jour
    const updatedPartenaire = await Partenaire.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPartenaire) {
      return res
        .status(404)
        .json({ message: `Aucun partenaire trouvé avec l'ID ${id}` });
    }

    res.status(200).json(updatedPartenaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// supprimer un partenaire
// Delete a partenaire
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const partenaire = await Partenaire.findByIdAndDelete(id);
      if (!partenaire) {
        return res
          .status(404)
          .json({ message: `cannot find any partenaire with Id ${id}` });
      }
      res.status(200).json(partenaire);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
