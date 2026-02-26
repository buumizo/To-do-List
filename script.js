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