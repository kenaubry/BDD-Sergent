const userId = 3;

fetch(`http://localhost:3000/users/${userId}`, {
  method: 'DELETE'
})
.then(() => {
  console.log('Utilisateur supprimé');
  // Vérifier la suppression
  return fetch('http://localhost:3000/users');
})
.then(response => response.json())
.then(data => {
  console.log('Liste des utilisateurs après suppression:', data);
})
.catch(error => {
  console.error('Erreur:', error);
});
