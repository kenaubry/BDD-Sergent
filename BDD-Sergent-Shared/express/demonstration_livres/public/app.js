const apiUrl = '/livres';

document.addEventListener('DOMContentLoaded', () => {
  fetchBooks();

  const bookForm = document.getElementById('book-form');
  bookForm.addEventListener('submit', handleFormSubmit);
});

function fetchBooks() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(books => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';
      books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <h3>${book.titre}</h3>
          <p>Auteur : ${book.auteur}</p>
          <div class="book-actions">
            <button onclick="editBook(${book.id})">Modifier</button>
            <button onclick="deleteBook(${book.id})">Supprimer</button>
          </div>
        `;
        bookList.appendChild(bookItem);
      });
    })
    .catch(error => console.error('Erreur:', error));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const idValue = document.getElementById('book-id').value;
  const id = idValue ? parseInt(idValue) : null;
  const titre = document.getElementById('title').value.trim();
  const auteur = document.getElementById('author').value.trim();

  if (!titre || !auteur) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const book = { titre, auteur };

  if (id) {
    // Mise à jour
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(() => {
        resetForm();
        fetchBooks();
      })
      .catch(error => console.error('Erreur:', error));
  } else {
    // Création
    getNextId().then(nextId => {
      book.id = nextId;
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      })
        .then(response => response.json())
        .then(() => {
          resetForm();
          fetchBooks();
        })
        .catch(error => console.error('Erreur:', error));
    });
  }
}

function editBook(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(book => {
      document.getElementById('book-id').value = book.id;
      document.getElementById('title').value = book.titre;
      document.getElementById('author').value = book.auteur;
    })
    .catch(error => console.error('Erreur:', error));
}

function deleteBook(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetchBooks();
      })
      .catch(error => console.error('Erreur:', error));
  }
}

function resetForm() {
  document.getElementById('book-id').value = '';
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

function getNextId() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(books => {
      if (books.length === 0) {
        return 1;
      } else {
        const ids = books.map(book => book.id);
        const maxId = Math.max(...ids);
        return maxId + 1;
      }
    });
}
