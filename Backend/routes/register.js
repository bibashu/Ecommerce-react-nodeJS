const express = require('express');
const User = require('../model/userModel'); // Assurez-vous que le chemin est correct
const cors = require('cors');
const bcrypt = require('bcrypt');
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());

// Route GET pour obtenir tous les utilisateurs
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}); // Correction : Utiliser User au lieu de Users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route POST pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).send('User registered');
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
