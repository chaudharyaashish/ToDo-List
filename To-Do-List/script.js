const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);
window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="check">
    <span>${taskText}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;
  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
}

taskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
    saveTasks();
  }

  if (e.target.classList.contains('edit')) {
    const span = e.target.parentElement.previousElementSibling;
    const newText = prompt('Edit your task:', span.textContent);
    if (newText) span.textContent = newText;
    saveTasks();
  }
});

taskList.addEventListener('change', e => {
  if (e.target.classList.contains('check')) {
    e.target.nextElementSibling.classList.toggle('completed');
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('.check').checked
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem('tasks')) || [];
  data.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="check" ${t.completed ? 'checked' : ''}>
      <span class="${t.completed ? 'completed' : ''}">${t.text}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}
