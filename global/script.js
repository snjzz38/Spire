// Load header and footer components
document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("global/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data
    })
    .catch((error) => console.error("Error loading header:", error))

  // Load footer
  fetch("global/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data
    })
    .catch((error) => console.error("Error loading footer:", error))
})

// Search functionality
function performSearch() {
  const searchTerm = document.querySelector(".search-box").value.toLowerCase()
  if (searchTerm.trim() === "") {
    alert("Please enter a search term")
    return
  }

// Simple search simulation - in a real app, this would connect to a search backend
  const searchResults = [
    { title: "Academic Preparation", url: "academics.html" },
    { title: "Application Process", url: "#applications" },
    { title: "Scholarship Information", url: "#scholarships" },
    { title: "Study Resources", url: "#resources" },
    { title: "SAT", url: "sat-act.html" },
    { title: "Opportunities", url: "opportunities.html" },
    { title: "Essays", url: "essays_applications.html" },
  ]
  
  const matches = searchResults.filter((item) => item.title.toLowerCase().includes(searchTerm))

  if (matches.length > 0) {
    const result = matches[0]
    window.location.href = result.url
  } else {
    alert('No results found for "' + searchTerm + '"')
  }
}

// Add search functionality when components are loaded
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("search-btn")) {
    performSearch()
  }
})

document.addEventListener("keypress", (e) => {
  if (e.target && e.target.classList.contains("search-box") && e.key === "Enter") {
    performSearch()
  }
})

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A" && e.target.getAttribute("href").startsWith("#")) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href").substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }
})
