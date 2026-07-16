// Form submission
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Form submission failed.");
        }

        showFormStatus("Your message was sent successfully.", "green");
        form.reset();
    } catch (error) {
        showFormStatus(
            "The message could not be sent. Please try again or contact me by email.",
            "red"
        );

        console.error(error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});

function showFormStatus(message, color) {
    statusMessage.textContent = message;
    statusMessage.style.color = color;
    statusMessage.style.opacity = "1";

    setTimeout(() => {
        statusMessage.style.opacity = "0";

        setTimeout(() => {
            statusMessage.textContent = "";
        }, 500);
    }, 5000);
}

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