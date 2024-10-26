const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier produits.json
const dataPath = path.join(__dirname, '../data/produits.json');

// Fonction pour lire les produits depuis le fichier JSON
function getProduits() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Fonction pour écrire les produits dans le fichier JSON
function saveProduits(produits) {
  fs.writeFileSync(dataPath, JSON.stringify(produits, null, 2));
}

// Récupérer tous les produits
router.get('/', (req, res) => {
  const produits = getProduits();
  res.json(produits);
});

// Récupérer un produit par ID
router.get('/:id', (req, res) => {
  const produits = getProduits();
  const produit = produits.find(p => p.id === parseInt(req.params.id));
  if (!produit) return res.status(404).send('Produit non trouvé');
  res.json(produit);
});

// Créer un nouveau produit
router.post('/', (req, res) => {
  const produits = getProduits();
  const nouveauProduit = {
    id: produits.length > 0 ? produits[produits.length - 1].id + 1 : 1,
    nom: req.body.nom,
    prix: req.body.prix,
  };
  produits.push(nouveauProduit);
  saveProduits(produits);
  res.status(201).json(nouveauProduit);
});

// Mettre à jour un produit
router.put('/:id', (req, res) => {
  const produits = getProduits();
  const produit = produits.find(p => p.id === parseInt(req.params.id));
  if (!produit) return res.status(404).send('Produit non trouvé');
  produit.nom = req.body.nom;
  produit.prix = req.body.prix;
  saveProduits(produits);
  res.json(produit);
});

// Supprimer un produit
router.delete('/:id', (req, res) => {
  let produits = getProduits();
  const index = produits.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Produit non trouvé');
  produits.splice(index, 1);
  saveProduits(produits);
  res.status(204).send();
});

module.exports = router;
