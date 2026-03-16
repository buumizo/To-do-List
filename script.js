function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value;
    let dueDateInput = document.getElementById("dueDateInput");
    let dueDateValue = dueDateInput.value; // format: yyyy-mm-dd

    if (taskValue === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    // include due date if provided, wrap text elements together
    li.innerHTML = `
        <div class="task-info">
            <span class="task-text">${taskValue}</span>
            ${dueDateValue ? `<span class="due-date">Due: ${dueDateValue}</span>` : ""}
        </div>
        <div class="action-buttons">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
    dueDateInput.value = ""; // reset date field
}

function deleteTask(button) {
    button.parentElement.remove();
}

function editTask(button) {
    const li = button.closest('li');
    const taskTextEl = li.querySelector('.task-text');
    const dueDateEl = li.querySelector('.due-date');

    const currentText = taskTextEl.textContent;
    const newText = prompt('Edit task description:', currentText);
    if (newText === null) return; // Cancelled

    const currentDate = dueDateEl ? dueDateEl.textContent.replace(/^Due:\s*/, '') : '';
    const newDate = prompt('Edit due date (YYYY-MM-DD or leave empty to remove):', currentDate);
    if (newDate === null) return;

    const trimmedText = newText.trim();
    if (!trimmedText) {
        alert('Task cannot be empty.');
        return;
    }

    taskTextEl.textContent = trimmedText;

    if (newDate.trim()) {
        if (dueDateEl) {
            dueDateEl.textContent = `Due: ${newDate.trim()}`;
        } else {
            const node = document.createElement('span');
            node.className = 'due-date';
            node.textContent = `Due: ${newDate.trim()}`;
            li.querySelector('.task-info').appendChild(node);
        }
    } else if (dueDateEl) {
        dueDateEl.remove();
    }
}

function searchTasks() {

    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {

        let text = task.textContent.toLowerCase();

        if (text.includes(input)) {
            task.style.display = "";
        } else {
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
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }

});