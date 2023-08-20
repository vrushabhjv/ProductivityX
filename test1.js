document.querySelector("#plusbutton").addEventListener("click", function() {
    console.log("Inside");
    document.querySelector(".popup").classList.add("active");
    document.querySelector("#main-container").classList.add("blurred");
});
document.querySelector(".popup .close-btn").addEventListener("click", function () {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector("#main-container").classList.remove("blurred");
});



document.getElementById("createTask").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get values from inputs
    const taskName = document.getElementById("Taskname").value;
    const startTime = document.getElementById("Starttime").value;
    const endTime = document.getElementById("Stoptime").value;
    const priority = document.getElementById("priority").value;
    
    // Log the values to the console (for testing)
    console.log("Task Name:", taskName);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Priority:", priority);
    
    // Clear the form inputs
    document.getElementById("Taskname").value = "";
    document.getElementById("Starttime").value = "";
    document.getElementById("Stoptime").value = "";
    document.getElementById("priority").value = "";
})


document.getElementById("createTask").addEventListener("click", function() {
    // Gather input values
    const taskName = document.getElementById("Taskname").value;
    const startTime = document.getElementById("Starttime").value;
    const stopTime = document.getElementById("Stoptime").value;
    const priority = document.getElementById("priority").value;

    // Create a new row for the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${taskName}</td><td>${startTime}</td><td>${stopTime}</td><td>${priority}</td>`;

    // Append the new row to the table body
    const tableBody = document.querySelector("#task-table tbody");
    tableBody.appendChild(newRow);
});
