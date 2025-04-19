const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const categorySelect = document.getElementById('category-select');
const taskList = document.getElementById('task-list');
const showAllBtn = document.getElementById('show-all-btn');
const urgentBtn = document.getElementById('urgent-btn');
const workBtn = document.getElementById('work-btn');
const personalBtn = document.getElementById('personal-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = (filter = null) => {
  taskList.innerHTML = '';
  const filteredTasks = filter ? tasks.filter(task => task.category === filter) : tasks;

  filteredTasks.forEach((task, index) => {
  const taskDiv = document.createElement('div');
  taskDiv.className = `task ${task.category}`;
  // if (task.completed) taskDiv.classList.add('completed');
  let styless = task.completed ? 'completed' : '';
    taskDiv.innerHTML = `
      <div id="test" class ="task-content">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
        <p class="${styless}">${task.text}</p>
      </div>
      <div class="task-actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>`;
    taskList.appendChild(taskDiv);
  });
};
const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};
const editTask = (index) => {
  const newTask = prompt("Edit task", tasks[index].text);
  if (newTask) {
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }
};
const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  const category = categorySelect.value;
  if (taskText) {
    const task = { text: taskText, category, completed: false };
    tasks.push(task);
    saveTasks();
    input.value = '';
    renderTasks();
  }
});

showAllBtn.addEventListener('click', () => renderTasks());
urgentBtn.addEventListener('click', () => renderTasks('urgent'));
workBtn.addEventListener('click', () => renderTasks('work'));
personalBtn.addEventListener('click', () => renderTasks('personal'));

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});