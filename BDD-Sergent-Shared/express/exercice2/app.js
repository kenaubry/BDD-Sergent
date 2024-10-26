const express = require('express');
const app = express();
const port = 3000;

// Clé d'API statique
const API_KEY = 'my-secret-key';

// Middleware d'authentification
function authentification(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (apiKey && apiKey === API_KEY) {
    next(); // Clé valide, passer au middleware suivant
  } else {
    res.status(401).send('Accès non autorisé');
  }
}

// Importer le routeur admin
const adminRouter = require('./routes/admin');

// Appliquer le middleware d'authentification aux routes /admin
app.use('/admin', authentification, adminRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
