const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/livres.json');

// Fonction pour lire les livres depuis le fichier JSON
function getLivres() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Fonction pour écrire les livres dans le fichier JSON
function saveLivres(livres) {
  fs.writeFileSync(dataPath, JSON.stringify(livres, null, 2));
}

// Récupérer tous les livres
router.get('/', (req, res) => {
  const livres = getLivres();
  res.json(livres);
});

// Récupérer un livre par ID
router.get('/:id', (req, res) => {
  const livres = getLivres();
  const livre = livres.find(l => l.id === parseInt(req.params.id));
  if (!livre) return res.status(404).send('Livre non trouvé');
  res.json(livre);
});

// Créer un nouveau livre
router.post('/', (req, res) => {
  const livres = getLivres();
  const nouveauLivre = {
    id: req.body.id,
    titre: req.body.titre,
    auteur: req.body.auteur
  };
  livres.push(nouveauLivre);
  saveLivres(livres);
  res.status(201).json(nouveauLivre);
});

// Mettre à jour un livre
router.put('/:id', (req, res) => {
  const livres = getLivres();
  const livre = livres.find(l => l.id === parseInt(req.params.id));
  if (!livre) return res.status(404).send('Livre non trouvé');
  livre.titre = req.body.titre;
  livre.auteur = req.body.auteur;
  saveLivres(livres);
  res.json(livre);
});

// Supprimer un livre
router.delete('/:id', (req, res) => {
  let livres = getLivres();
  const index = livres.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Livre non trouvé');
  livres.splice(index, 1);
  saveLivres(livres);
  res.status(204).send();
});

module.exports = router;
