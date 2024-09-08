const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
      },
  
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
