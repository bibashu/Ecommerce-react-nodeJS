const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 

// Importer la route des produits
const productRoutes = require('./routes/products');
const partenaireRoutes = require('./routes/partenaire')
const userRoute = require('./routes/register') 
const userRouteLogin = require('./routes/login') 
const messageRoute = require('./routes/message') 
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: false }));

// Utiliser la route des produits
app.use('/products', productRoutes);
app.use('/partenaire', partenaireRoutes);
app.use('/api/', userRoute);
app.use('/api/', userRouteLogin);
app.use('/api/', messageRoute);

// Connexion à MongoDB et démarrage du serveur
mongoose
  .connect("mongodb+srv://bibachu8:biba12398@e-commerceapi.m8ryk.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=e-commerceAPI")
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
    app.listen(5000, () => {
      console.log("Serveur démarré sur le port 5000");
    });
  })
  .catch((error) => {
    console.log("Erreur lors de la connexion à la base de données :", error);
  });
