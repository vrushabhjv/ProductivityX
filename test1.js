// Add an event listener to close the dropdown when clicking outside
document.addEventListener("click", function(event) {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        if (!dropdown.contains(event.target)) {
            const dropdownContent = dropdown.querySelector(".dropdown-content");
            dropdownContent.style.display = "none";
        }
    });
  });
  
  // Add an event listener to toggle the dropdown when clicking the dropbtn
  const dropbtns = document.querySelectorAll(".dropbtn");
  dropbtns.forEach(function(dropbtn) {
    dropbtn.addEventListener("click", function() {
        const dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
  });
  