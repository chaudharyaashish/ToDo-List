const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todos = [];

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const task = { id: Date.now(), text, completed: false };
  todos.push(task);
  input.value = "";
  renderTasks();
}

function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTasks();
}

function editTask(id) {
  const task = todos.find((t) => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText) {
    task.text = newText;
    renderTasks();
  }
}

function deleteTask(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", todo.completed);

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "btn-complete";
    completeBtn.innerHTML = '<i class="ri-checkbox-circle-line"></i>';
    completeBtn.onclick = () => toggleComplete(todo.id);

    const editBtn = document.createElement("button");
    editBtn.className = "btn-edit";
    editBtn.innerHTML = '<i class="ri-edit-2-line"></i>';
    editBtn.onclick = () => editTask(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerHTML = '<i class="ri-delete-bin-6-line"></i>';
    deleteBtn.onclick = () => deleteTask(todo.id);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(span, actions);
    taskList.append(li);
  });
}
