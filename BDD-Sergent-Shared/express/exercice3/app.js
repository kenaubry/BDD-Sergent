const express = require('express');
const app = express();
const port = 3000;

// Configurer le moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour traiter les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Route GET pour afficher le formulaire de contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Route POST pour traiter le formulaire
app.post('/contact', (req, res) => {
  const { nom, email, message } = req.body;

  // Validation des données
  if (!nom || !email || !message) {
    return res.send('Tous les champs sont requis.');
  }

  res.render('merci', { nom });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
