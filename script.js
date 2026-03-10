function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value;

    if(taskValue === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        ${taskValue}
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}



// TOGGLE DARK MODE
const toggleSwitch = document.getElementById("darkModeToggle");

// Charger le thème sauvegardé
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});