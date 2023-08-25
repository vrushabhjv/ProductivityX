document.querySelector("#show-login").addEventListener("click", function () {
  console.log("1")
    document.querySelector(".popup").classList.add("active");
    document.querySelector("#main-container").classList.add("blurred");
  });
  
  document.querySelector(".close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
    document.querySelector("#main-container").classList.remove("blurred");
  });


  
  function fetchTasksAndPopulateTable() {
    // Perform the navigation first
    window.location.href = "afterlogin.html";
    console.log("Inside fetchTasksAnd PopulateTable function")
    // Fetch tasks from the server
    fetchTasks();
}

