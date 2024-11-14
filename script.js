const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
}

function saveTasks() {
  const tasks = [];
  const listItems = taskList.getElementsByTagName('li');
  for (let li of listItems) {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      completed: li.classList.contains('completed')
    });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(taskContent, isCompleted = false) {
  const li = document.createElement('li');
  
  const taskText = document.createElement('span');
  taskText.textContent = taskContent;
  taskText.classList.add('task-text');
  
  if (isCompleted) {
    li.classList.add('completed');
  }

  li.addEventListener('click', (e) => {
    if (e.target !== removeButton) {
      li.classList.toggle('completed');
      saveTasks(); 
    }
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove');

  removeButton.addEventListener('click', (e) => {
    e.stopPropagation(); 
    taskList.removeChild(li);
    saveTasks(); 
  });

  li.appendChild(taskText);
  li.appendChild(removeButton);

  taskList.appendChild(li);

  saveTasks();
}

addTaskButton.addEventListener('click', () => {
  const taskContent = taskInput.value.trim();

  if (taskContent !== '') {
    createTask(taskContent);
    taskInput.value = ''; 
  } else {
    alert('Please enter a task.');
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

window.addEventListener('load', loadTasks);
