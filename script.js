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


saveTaskBtn.addEventListener("click",async function () {

    // Get values from the form
    const title = taskTitle.value;
    const description = taskDescription.value;
    const start = startDate.value;
    const end = endDate.value;

    // Check whether required fields are filled
    if (title === "" || description === "" || start === "" || end === "") {
        alert("Please fill all the fields");
        return;
    }

    // Create a new table row
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
        completed: false
    })
});

const savedTask = await response.json();
    const row = document.createElement("tr");

    // Create table cells
    const numberCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const startCell = document.createElement("td");
    const endCell = document.createElement("td");
    const statusCell = document.createElement("td");
    const actionCell = document.createElement("td");

    // Put values into cells
    numberCell.textContent = taskTableBody.children.length + 1;
    titleCell.textContent = title;
    descriptionCell.textContent = description;
    startCell.textContent = start;
    endCell.textContent = end;

    // Status
    statusCell.textContent = "Pending";

    // Add cells to row
    row.appendChild(numberCell);
    row.appendChild(titleCell);
    row.appendChild(descriptionCell);
    row.appendChild(startCell);
    row.appendChild(endCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    // Add row to table
    taskTableBody.appendChild(row);

    // Clear form
    taskTitle.value = "";
    taskDescription.value = "";
    startDate.value = "";
    endDate.value = "";

});