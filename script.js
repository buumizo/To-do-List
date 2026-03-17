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

function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        toggleSwitch.checked = false;
    }
}

function initializeTheme() {
    const storedMode = localStorage.getItem("darkMode");

    if (storedMode === "enabled") {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
}

initializeTheme();

toggleSwitch.addEventListener("change", function () {
    setDarkMode(this.checked);
});

// Accessibility: use Enter key to add a task (no Add button needed)
function enableEnterToAdd() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");

    function onEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    }

    if (taskInput) taskInput.addEventListener("keydown", onEnter);
    if (dueDateInput) dueDateInput.addEventListener("keydown", onEnter);
}

enableEnterToAdd();