const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Fonction pour charger les données depuis le fichier JSON
const loadData = () => {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
};

// Fonction pour enregistrer les données dans le fichier JSON
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Route GET /notes
app.get('/notes', (req, res) => {
  const data = loadData();
  res.json(data.notes);
});

// Route GET /notes/:id
app.get('/notes/:id', (req, res) => {
  const data = loadData();
  const note = data.notes.find(note => note.id === parseInt(req.params.id));
  if (!note) return res.status(404).send('Note not found');
  res.json(note);
});

// Route POST /notes
app.post('/notes', (req, res) => {
  const data = loadData();
  const newNote = {
    id: data.notes.length ? data.notes[data.notes.length - 1].id + 1 : 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  data.notes.push(newNote);
  saveData(data);
  res.status(201).json(newNote);
});

// Route PUT /notes/:id
app.put('/notes/:id', (req, res) => {
  const data = loadData();
  const index = data.notes.findIndex(note => note.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Note not found');

  data.notes[index] = { id: parseInt(req.params.id), ...req.body };
  saveData(data);
  res.json(data.notes[index]);
});

// Route DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const data = loadData();
  const newData = data.notes.filter(note => note.id !== parseInt(req.params.id));
  if (newData.length === data.notes.length) return res.status(404).send('Note not found');

  data.notes = newData;
  saveData(data);
  res.status(204).send();
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
