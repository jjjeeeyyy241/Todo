const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const editButton = document.getElementById("edit-button");
const doneButton = document.getElementById("done-button");

function addTask() {
    const task = inputBox.value.trim();
    if (task === '') {
        alert("You must write something");
        return;
    }
    listContainer.innerHTML += `<li>${task}<span>\u00d7</span></li>`;
    inputBox.value = "";
    saveData();
}

function editTasks() {
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        task.contentEditable = true;
        task.focus();
    });
    editButton.style.display = "none";
    doneButton.style.display = "inline-block";
}

function endEdit() {
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        task.contentEditable = false;
    });
    doneButton.style.display = "none";
    editButton.style.display = "inline-block";
}

listContainer.addEventListener("click", function(e) {
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove();
    }
    saveData();
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});