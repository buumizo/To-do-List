const taskList = document.getElementById("taskList");
const toggleSwitch = document.getElementById("darkModeToggle");

/* LOAD SAVED TASKS */

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks(){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
createTaskElement(task.text, task.completed);
});

}

/* SAVE TASKS */

function saveTasks(){

let tasks = [];

document.querySelectorAll("#taskList li").forEach(li => {

tasks.push({
text: li.querySelector(".task-text").textContent,
completed: li.classList.contains("completed")
});

});

localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* ADD TASK */

function addTask(){

let input = document.getElementById("taskInput");
let taskText = input.value.trim();

if(taskText === ""){
alert("Please enter a task");
return;
}

createTaskElement(taskText,false);

input.value="";

saveTasks();

}

/* CREATE TASK */

function createTaskElement(text, completed){

let li = document.createElement("li");

if(completed){
li.classList.add("completed");
}

li.innerHTML = `
<span class="task-text">${text}</span>

<div>
<button class="complete-btn" onclick="toggleComplete(this)">✓</button>
<button class="edit-btn" onclick="editTask(this)">Edit</button>
<button class="delete-btn" onclick="deleteTask(this)">Delete</button>
</div>
`;

taskList.appendChild(li);

}

/* DELETE TASK */

function deleteTask(button){

button.parentElement.parentElement.remove();

saveTasks();

}

/* EDIT TASK */

function editTask(button){

let li = button.parentElement.parentElement;

let span = li.querySelector(".task-text");

let newText = prompt("Edit task:", span.textContent);

if(newText !== null && newText.trim() !== ""){
span.textContent = newText.trim();
saveTasks();
}

}

/* COMPLETE TASK */

function toggleComplete(button){

let li = button.parentElement.parentElement;

li.classList.toggle("completed");

saveTasks();

}

/* DARK MODE */

if(localStorage.getItem("darkMode") === "enabled"){
document.body.classList.add("dark-mode");
toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", function(){

if(this.checked){
document.body.classList.add("dark-mode");
localStorage.setItem("darkMode","enabled");
}else{
document.body.classList.remove("dark-mode");
localStorage.setItem("darkMode","disabled");
}

});