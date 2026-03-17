// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {

let taskInput = document.getElementById("taskInput");
let dueDateInput = document.getElementById("dueDateInput");

let taskValue = taskInput.value.trim();
let dueDateValue = dueDateInput.value;

if (taskValue === "") {
alert("Please enter a task");
return;
}

createTaskElement(taskValue, dueDateValue);
saveTask(taskValue, dueDateValue);

taskInput.value = "";
dueDateInput.value = "";

}


// CREATE TASK ELEMENT (Reusable)
function createTaskElement(text, dueDate) {

let li = document.createElement("li");

li.innerHTML = `
<div class="task-info">
<span class="task-text">${text}</span>
${dueDate ? `<span class="due-date">Due: ${dueDate}</span>` : ""}
</div>

<div class="action-buttons">
<button class="edit-btn" onclick="editTask(this)">Edit</button>
<button class="delete-btn" onclick="deleteTask(this)">Delete</button>
</div>
`;

document.getElementById("taskList").appendChild(li);

}


// SAVE TASK TO LOCAL STORAGE
function saveTask(text, dueDate) {

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.push({ text, dueDate });

localStorage.setItem("tasks", JSON.stringify(tasks));

}


// LOAD TASKS FROM STORAGE
function loadTasks() {

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
createTaskElement(task.text, task.dueDate);
});

}


// DELETE TASK
function deleteTask(button) {

let li = button.closest("li");
let text = li.querySelector(".task-text").textContent;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.filter(task => task.text !== text);

localStorage.setItem("tasks", JSON.stringify(tasks));

li.remove();

}


// EDIT TASK
function editTask(button) {

const li = button.closest("li");

const taskText = li.querySelector(".task-text");
const dueDate = li.querySelector(".due-date");

let oldText = taskText.textContent;

let newText = prompt("Edit task:", oldText);

if (newText === null) return;

newText = newText.trim();

if (newText === "") {
alert("Task cannot be empty");
return;
}

let currentDate = dueDate ? dueDate.textContent.replace("Due: ", "") : "";

let newDate = prompt("Edit due date (YYYY-MM-DD)", currentDate);

if (newDate === null) return;

// Update UI
taskText.textContent = newText;

if (newDate.trim() !== "") {

if (dueDate) {
dueDate.textContent = "Due: " + newDate.trim();
}
else {
let span = document.createElement("span");
span.className = "due-date";
span.textContent = "Due: " + newDate.trim();
li.querySelector(".task-info").appendChild(span);
}

}
else if (dueDate) {
dueDate.remove();
}

// Update Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map(task => {
if (task.text === oldText) {
return { text: newText, dueDate: newDate };
}
return task;
});

localStorage.setItem("tasks", JSON.stringify(tasks));

}


// SEARCH FUNCTION
function searchTasks() {

let input = document.getElementById("searchInput").value.toLowerCase();
let tasks = document.querySelectorAll("#taskList li");

tasks.forEach(task => {

let text = task.textContent.toLowerCase();

if (text.includes(input)) {
task.style.display = "";
}
else {
task.style.display = "none";
}

});

}


// DARK MODE
const toggleSwitch = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {

document.body.classList.add("dark-mode");
toggleSwitch.checked = true;

}

toggleSwitch.addEventListener("change", function () {

if (this.checked) {
document.body.classList.add("dark-mode");
localStorage.setItem("darkMode", "enabled");
}
else {
document.body.classList.remove("dark-mode");
localStorage.setItem("darkMode", "disabled");
}

});