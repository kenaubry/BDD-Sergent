const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Importer les routes des produits
const produitsRouter = require('./routes/produits');
app.use('/produits', produitsRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
