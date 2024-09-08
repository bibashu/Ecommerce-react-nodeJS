const express = require("express");
const router = express.Router();
const Message = require('../model/message')
const User = require('../model/userModel')
router.post("/message", async (req, res) => {
    try {
        const { nom, prenom, email, message, userID } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newMessage = new Message({
            nom,
            prenom,
            email,
            message,
            userID: user._id,
        });

        await newMessage.save();
        res.status(201).send('Message sent successfully');
        
    } catch (error) {
        console.error("Error in /message route:", error);
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
});


module.exports = router;
