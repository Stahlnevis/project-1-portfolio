document.addEventListener("DOMContentLoaded", function () {
  // Hero Section
  const heroText = "Welcome to My Portfolio";
  const typingSpeed = 100; // in milliseconds
  const heroElement = document.getElementById("hero-text");

  function typeWriter(text, i) {
    if (i < text.length) {
      heroElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(function () {
        typeWriter(text, i);
      }, typingSpeed);
    }
  }

  typeWriter(heroText, 0);

  // Projects Showcase Section
  const projects = document.querySelectorAll(".project-card");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-input");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tech = btn.dataset.tech;
      projects.forEach((project) => {
        project.style.display = "none";
        if (project.dataset.tech.includes(tech)) {
          project.style.display = "block";
        }
      });
    });
  });

  searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();
    projects.forEach((project) => {
      const title = project
        .querySelector(".project-title")
        .innerText.toLowerCase();
      if (title.includes(searchQuery)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });

  // Details Modal section
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const detailsBtn = card.querySelector(".modal-btn");
    detailsBtn.addEventListener("click", function () {
      const title = card.querySelector(".project-title").textContent;
      const description = card.querySelector(
        ".project-description"
      ).textContent;
      const technologies = card.dataset.tech.split(",");
      const techList = technologies
        .map((tech) => `<li>${tech.trim()}</li>`)
        .join("");
      const githubLink = card.dataset.github;
      const demoLink = card.dataset.demo;

      modalContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <h2>${title}</h2>
            <p>${description}</p>
            <p>Technologies Used:</p>
            <ul class="technologies-used">
                ${techList}
            </ul>
            <div class="project-links">
                <a href="${githubLink}" class="github-link" target="_blank">GitHub</a>
                <a href="${demoLink}" class="demo-link" target="_blank">Live Demo</a>
            </div>
        `;

      modal.style.display = "block";

      // Adding event listener to the close button within modal content
      const closeButton = document.querySelector(".close-btn");
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Skills Section
  // Optional: Animate skill bars on scroll
  window.addEventListener("scroll", () => {
    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach((bar) => {
      const percentage = bar.getAttribute("data-percentage");
      bar.querySelector(".skill-level").style.width = percentage + "%";
    });
  });

  // Mini-Applications Section
  // Implement Age Calculator and To-Do List

  // todolist
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;
      taskList.appendChild(taskItem);
      taskInput.value = "";

      // Save task to local storage
      localStorage.setItem("tasks", taskList.innerHTML);
    }
  });

  // Load tasks from local storage
  if (localStorage.getItem("tasks")) {
    taskList.innerHTML = localStorage.getItem("tasks");
  }

  // Event delegation for removing tasks
  taskList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      event.target.remove();

      // Update local storage
      localStorage.setItem("tasks", taskList.innerHTML);
    }
  });

  // age calculator
  const calculateBtn = document.getElementById("calculate-btn");
  const ageResult = document.getElementById("age-result");

  calculateBtn.addEventListener("click", function () {
    const birthdate = new Date(document.getElementById("birthdate").value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    ageResult.textContent = `Your age is ${age} years old.`;
  });

  // Contact Form Section
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Validate form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    // If all fields are valid, display thank you message
    const thankYouMessage = document.createElement("div");
    thankYouMessage.textContent = "Thank you for your message!";
    contactForm.parentNode.insertBefore(thankYouMessage, contactForm);
    contactForm.reset();
  });

  //animate about me
  window.onload = function () {
    var developerText = document.querySelector(".bouncy-text");
    developerText.classList.add("bouncy-text");
  };
});
