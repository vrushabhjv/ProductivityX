document.querySelector("#plusbutton").addEventListener("click", function () {
    console.log("Inside");
    document.querySelector(".popup").classList.add("active");
    document.querySelector("#main-container").classList.add("blurred");
});

document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
    document.querySelector("#main-container").classList.remove("blurred");
});

document.addEventListener("DOMContentLoaded", function () {
    let editedTaskId = null;

    document.getElementById("task-table").addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("edit-button")) {
            const row = target.closest("tr");
            editedTaskId = row.dataset.taskId;

            const cells = row.getElementsByTagName("td");
            const taskName = cells[0].textContent;
            const startTime = cells[1].textContent;
            const stopTime = cells[2].textContent;
            const priority = cells[3].textContent;

            document.getElementById("Taskname").value = taskName;
            document.getElementById("Starttime").value = startTime;
            document.getElementById("Stoptime").value = stopTime;
            document.getElementById("priority").value = priority;

            document.getElementById("createTask").textContent = "Update Task";

            document.querySelector(".popup").classList.add("active");
            document.querySelector("#main-container").classList.add("blurred");
        }
    });

    document.getElementById("createTask").addEventListener("click", async function () {
        const taskName = document.getElementById("Taskname").value;
        const startTime = document.getElementById("Starttime").value;
        const stopTime = document.getElementById("Stoptime").value;
        const priority = document.getElementById("priority").value;

        try {
            let response;
            if (!editedTaskId) {
                // Create a new task on the server
                response = await fetch('http://localhost:3000/create-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ taskName, startTime, endTime: stopTime, priority })
                });
            } else {
                // Update an existing task on the server using the correct _id
                console.log("edited task",editedTaskId)
                response = await fetch(`http://localhost:3000/update-task/${editedTaskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ taskName, startTime, endTime: stopTime, priority })
                });
            }

            if (response.ok) {
                if (!editedTaskId) {
                    const newRow = document.createElement("tr");
                    newRow.dataset.taskId = response._id; // Assuming the server sends back the new task's _id
                    newRow.innerHTML = `<td>${taskName}</td><td>${startTime}</td><td>${stopTime}</td><td>${priority}</td><td><button class="edit-button">Edit</button></td>`;
                    document.getElementById("task-table").appendChild(newRow);
                } else {
                    const tableRow = document.querySelectorAll("#task-table tr")[editedRowIndex];
                    const cells = tableRow.getElementsByTagName("td");
                    cells[0].textContent = taskName;
                    cells[1].textContent = startTime;
                    cells[2].textContent = stopTime;
                    cells[3].textContent = priority;

                    document.getElementById("createTask").textContent = "Create Task";

                    editedRowIndex = -1;
                }

                document.getElementById("Taskname").value = "";
                document.getElementById("Starttime").value = "";
                document.getElementById("Stoptime").value = "";
                document.getElementById("priority").value = "";
                alert("Task is successfully " + (!editedTaskId ? "created" : "updated"));
                //fetchTasks();
            } else {
                alert("Error " + (!editedTaskId ? "creating" : "updating") + " task");
            }

            editedTaskId = null;
        } catch (error) {
            console.error('Error ' + (!editedTaskId ? "creating" : "updating") + ' task:', error);
            alert("An error occurred while " + (!editedTaskId ? "creating" : "updating") + " the task");
        }
    });
});

async function fetchTasks() {
    try {
        console.log("Inside fetchTasks function")
        alert("Inside fetchTasks function")
        // Fetch tasks from the server
        const response = await fetch('http://localhost:3000/get-tasks');
        const tasks = await response.json();

        const taskTableBody = document.querySelector("#task-table tbody");
        
        tasks.forEach(task => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${task.taskName}</td>
                <td>${task.startTime}</td>
                <td>${task.endTime}</td>
                <td>${task.priority}</td>
                
                <td><button class="edit-button" data-task-id="${task._id}">Edit</button></td>
            `;
            taskTableBody.appendChild(newRow);
            // alert(task.taskName)
            //     alert("Task fetched")
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


