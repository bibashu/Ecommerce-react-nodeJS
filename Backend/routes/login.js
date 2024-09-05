const express = require("express");
const User = require("../model/userModel"); // Assurez-vous que le chemin est correct
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Route POST pour enregistrer un nouvel utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, "biba123", { expiresIn: "1h" });
  res.status(200).json({ token });
});
// middleware auth
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'biba123'); // Use the same secret key as during token generation
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    
    req.user = user; // Attach the user object to the request object
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).send(req.user); // Now you have access to the connected user's information
});
module.exports = router;
