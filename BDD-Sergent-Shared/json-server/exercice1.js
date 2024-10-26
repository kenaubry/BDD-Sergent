const users = [
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'Diana', email: 'diana@example.com' }
  ];
  
  // Fonction pour créer un utilisateur
  function createUser(user) {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }
  
  // Créer les utilisateurs de manière séquentielle
  createUser(users[0])
  .then(() => createUser(users[1]))
  .then(() => createUser(users[2]))
  .then(() => {
    // Récupérer la liste des utilisateurs
    return fetch('http://localhost:3000/users');
  })
  .then(response => response.json())
  .then(data => {
    console.log('Liste complète des utilisateurs:', data);
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
