// Status message
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        status.textContent = "Please fill out all fields.";
        status.style.color = "red";
        return;
    }

    status.textContent = "Thank you! This contact form is currently a demo. Please reach out via LinkedIn or email.";

    status.style.color = "green";
    status.style.opacity = "1";

    form.reset();

    setTimeout(() => {
        status.style.opacity = "0";

        setTimeout(() => {
            status.textContent = "";
        }, 500);
    }, 5000);
});

// Highlight nav bar
const navLinks = document.querySelectorAll("nav a[href^='#']");

const sections = Array.from(navLinks)
    .map((link) => {
        const sectionId = link.getAttribute("href");
        return document.querySelector(sectionId);
    })
    .filter(Boolean);

function updateActiveNavigation() {
    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


// Scroll to top
const scrollTopButton = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        scrollTopButton.classList.add("visible");
    } else {
        scrollTopButton.classList.remove("visible");
    }
});

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Footer dynamic year calculation
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Adaptive menu for mobile
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}