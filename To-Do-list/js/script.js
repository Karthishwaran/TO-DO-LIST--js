const btnAddTask = document.getElementById("addtaskbtn");
const taskInput = document.getElementById("taskinput");
const taskList = document.getElementById("tasklist");


// Add task button click event
btnAddTask.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskId = Date.now();
        addTaskToList(taskText, taskId);
        saveTaskToLocalStorage(taskText, taskId);
        taskInput.value = "";
    }
});

// Function to add task to the list
function addTaskToList(text, id) {
    const li = document.createElement("li");
    li.setAttribute("data-id", id);

    // Task text
    const span = document.createElement("span");
    span.textContent = text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;
    deleteBtn.classList.add("delete-btn");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa fa-edit"></i>`;
    editBtn.classList.add("edit-btn");

    // Append elements to list item
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);

    // Delete task event
    deleteBtn.addEventListener("click", function () {
        li.remove();
        removeTaskFromLocalStorage(id);
    });

    // Edit task event
    editBtn.addEventListener("click", function () {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            updateTaskInLocalStorage(id, newText.trim());
        }
    });
}
// Load saved tasks on window load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTaskToList(task.text, task.id);
    });
};

// Function to save task to local storage
function saveTaskToLocalStorage(text, id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, id });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update task in local storage
function updateTaskInLocalStorage(id, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => (task.id === id ? { text: newText, id } : task));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

