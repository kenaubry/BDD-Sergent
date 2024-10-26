const express = require('express');
const path = require('path');
const app = express();
const livresRouter = require('./routes/livres');

app.use(express.json());

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/livres', livresRouter);

app.listen(3000, () => {
  console.log('API en écoute sur http://localhost:3000');
});
