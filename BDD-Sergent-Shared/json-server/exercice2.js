const userId = 2;

fetch(`http://localhost:3000/users/${userId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Charlie Updated'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Utilisateur mis à jour:', data);
  // Vérifier la mise à jour
  return fetch(`http://localhost:3000/users/${userId}`);
})
.then(response => response.json())
.then(data => {
  console.log('Données de l\'utilisateur après mise à jour:', data);
})
.catch(error => {
  console.error('Erreur:', error);
});
