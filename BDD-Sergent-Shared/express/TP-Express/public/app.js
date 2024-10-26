const apiUrl = '/notes';

document.addEventListener('DOMContentLoaded', () => {
  fetchNotes();

  const noteForm = document.getElementById('note-form');
  noteForm.addEventListener('submit', handleFormSubmit);
});

function fetchNotes() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(notes => {
      const notesList = document.getElementById('notes-list');
      notesList.innerHTML = '';
      notes.forEach(note => {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <small>${note.date}</small>
          <div class="note-actions">
            <button onclick="editNote(${note.id})">Modifier</button>
            <button onclick="deleteNote(${note.id})">Supprimer</button>
          </div>
        `;
        notesList.appendChild(noteItem);
      });
    })
    .catch(error => console.error('Erreur:', error));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('note-id').value;
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const date = new Date().toISOString().split('T')[0];

  if (!title || !content) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const note = { title, content, date };
  const url = id ? `${apiUrl}/${id}` : apiUrl;
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  })
    .then(() => {
      resetForm();
      fetchNotes();
    })
    .catch(error => console.error('Erreur:', error));
}

function editNote(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(note => {
      document.getElementById('note-id').value = note.id;
      document.getElementById('title').value = note.title;
      document.getElementById('content').value = note.content;
    })
    .catch(error => console.error('Erreur:', error));
}

function deleteNote(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchNotes())
      .catch(error => console.error('Erreur:', error));
  }
}

function resetForm() {
  document.getElementById('note-id').value = '';
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}
