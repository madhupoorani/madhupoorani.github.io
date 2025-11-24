// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.style.padding = "0.5rem 0";
    navbar.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.15)";
  } else {
    navbar.style.padding = "0.5rem 0";
    navbar.style.boxShadow = "0 2px 10px rgba(139, 92, 246, 0.1)";
  }

  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Add active class to current nav link
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
    `;

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add hover effect to scroll top button
scrollTopBtn.addEventListener("mouseenter", () => {
  scrollTopBtn.style.transform = "translateY(-5px) scale(1.1)";
  scrollTopBtn.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.5)";
});

scrollTopBtn.addEventListener("mouseleave", () => {
  scrollTopBtn.style.transform = "translateY(0) scale(1)";
  scrollTopBtn.style.boxSadow = "0 4px 15px rgba(139, 92, 246, 0.4)";
});

// Add particle effect on hero section (optional)
const hero = document.querySelector(".hero");
hero.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  hero.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitBtn = document.querySelector(".submit-btn");

  // Create a response element dynamically
  const responseEl = document.createElement("div");
  responseEl.id = "response";
  responseEl.style.marginTop = "15px";
  form.appendChild(responseEl);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    responseEl.textContent = "";
    responseEl.className = "";

    // Form data
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx1RcbI81xZ2kIDZg2k3mtan05nAKN5F22GuxB8IEftM3Uiv6-01ybu3lZGFNc4n_4isQ/exec", // <-- Replace this
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.text();

      // Success message
      responseEl.className = "response success";
      responseEl.textContent = result;
      form.reset();
    } catch (error) {
      // Error message
      responseEl.className = "response error";
      responseEl.textContent = "Something went wrong. Please try again later!";
      console.error("Error:", error);
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });
});
