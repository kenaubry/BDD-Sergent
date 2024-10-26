const express = require('express');
const router = express.Router();

// Route protégée
router.get('/dashboard', (req, res) => {
  res.send('Bienvenue sur le tableau de bord administrateur');
});

module.exports = router;
