document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todoList');
  const addBtn = document.getElementById('addBtn');
  const clearBtn = document.getElementById('clearBtn');
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'flex items-center justify-between p-3 border rounded';
      todoItem.innerHTML = `
        <div class="flex-grow">
          <h3 class="text-lg font-semibold">${todo.title || ''}</h3>
          <p>${todo.content}</p>
        </div>
        <button data-index="${index}" class="text-red-500 hover:text-red-700 focus:outline-none delete-btn">Delete</button>
      `;
      todoList.appendChild(todoItem);
    });
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addBtn.addEventListener('click', () => {
    const content = document.getElementById('content').value;
    if (content.trim() !== '') {
      const title = document.getElementById('title').value.trim();
      todos.push({ title, content });
      renderTodos();
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
    }
  });

  todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      todos.splice(index, 1);
      renderTodos();
    }
  });

  clearBtn.addEventListener('click', () => {
    deleteModal.classList.remove('hidden');
  });

  confirmDeleteBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
    deleteModal.classList.add('hidden');
  });

  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
  });

  renderTodos();
});
