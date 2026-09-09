const showFormBtn = document.getElementById("showFormBtn");
const taskForm = document.getElementById("taskForm");


showFormBtn.addEventListener("click", function() {
    taskForm.style.display = "block";
});

const closeFormBtn = document.getElementById("closeFormBtn");

closeFormBtn.addEventListener("click", function() {
    taskForm.style.display = "none";
});

const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskTableBody = document.getElementById("taskTableBody");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");


saveTaskBtn.addEventListener("click", async function () {

    const title = taskTitle.value;
    const description = taskDescription.value;
    const start = startDate.value;
    const end = endDate.value;

    if (title === "" || description === "" || start === "" || end === "") {
        alert("Please fill all the fields");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                startDate: start,
                endDate: end,
                 status: "Pending"
            })
        });

        if (!response.ok) {
            throw new Error("Failed to save task");
        }

        const savedTask = await response.json();

        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        const titleCell = document.createElement("td");
        const descriptionCell = document.createElement("td");
        const startCell = document.createElement("td");
        const endCell = document.createElement("td");
        const statusCell = document.createElement("td");
        const actionCell = document.createElement("td");

        numberCell.textContent = taskTableBody.children.length + 1;
        titleCell.textContent = savedTask.title;
        descriptionCell.textContent = savedTask.description;
        startCell.textContent = savedTask.startDate;
        endCell.textContent = savedTask.endDate;
        statusCell.textContent = "Pending";

        row.appendChild(numberCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(startCell);
        row.appendChild(endCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        taskTableBody.appendChild(row);

        taskTitle.value = "";
        taskDescription.value = "";
        startDate.value = "";
        endDate.value = "";

        alert("Task saved successfully!");

    } catch (error) {
        console.error("Error saving task:", error);
        alert("Could not save task. Make sure the backend server is running.");
    }
});


async function loadTasks() {
    console.log("loadTasks is running");
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();

    taskTableBody.innerHTML = "";

tasks.forEach(task => {
    const row = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.textContent = taskTableBody.children.length + 1;
    row.appendChild(numberCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = task.title;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = task.description;
    row.appendChild(descriptionCell);

    const startCell = document.createElement("td");
    startCell.textContent = task.startDate;
    row.appendChild(startCell);

    const endCell = document.createElement("td");
    endCell.textContent = task.endDate;
    row.appendChild(endCell);

    const statusCell = document.createElement("td");

    const statusText = document.createElement("span");
    statusText.textContent = task.status || "Pending";

    const changeButton = document.createElement("button");
changeButton.textContent = "Change";

changeButton.addEventListener("click", function () {

    const statusMenu = document.createElement("select");

    const options = [
        "Pending",
        "Started",
        "Paused",
        "Completed"
    ];

    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;

        if (option === task.status) {
            optionElement.selected = true;
        }

        statusMenu.appendChild(optionElement);
    });

    statusCell.innerHTML = "";
    statusCell.appendChild(statusMenu);

    statusMenu.addEventListener("change", async function () {

    const selectedStatus = statusMenu.value;

    try {
        const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: selectedStatus
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        task.status = selectedStatus;
        statusText.textContent = selectedStatus;

        statusCell.innerHTML = "";
        statusCell.appendChild(statusText);
        statusCell.appendChild(changeButton);

        alert("Status updated successfully!");

    } catch (error) {
        console.error("Error updating status:", error);
        alert("Could not update status.");
    }
});
});

statusCell.appendChild(statusText);
    statusCell.appendChild(changeButton);
    row.appendChild(statusCell);

    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {
        await fetch(`http://localhost:3000/tasks/${task._id}`, {
            method: "DELETE"
        });

        row.remove();
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    taskTableBody.appendChild(row);
});
}

loadTasks();