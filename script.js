// DeepGenX Website JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close menu when links are clicked
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // Smooth Scrolling with Header Offset Fix
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Background Alpha Layer on Scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Fade-in Scroll Animations Setup (Added .game-card here)
  const animatedElements = document.querySelectorAll(
    ".service-card, .industry-card, .partner-logos img, .about-image, .about-content, .game-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // Contact Form Interception & Micro-feedback
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending Global Request...";

        setTimeout(() => {
          alert("Thank you for contacting DeepGenX. Our consulting unit will contact you shortly.");
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1500);
      }
    });
  }

  // Utility: Scroll to Top Button Action Hook
  const scrollBtn = document.querySelector("#scrollTop");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Game Notification Handler (Safely inside DOMContentLoaded now)
  document.querySelectorAll(".btn-game-notify").forEach((btn) => {
    btn.addEventListener("click", function() {
      const gameName = this.getAttribute("data-game");
      alert(`Excellent choice! You've been added to the early-access pipeline for "${gameName}". We'll update you as soon as the Android build clears Google Play staging.`);
      this.textContent = "Registered ✓";
      this.style.background = "#10b981";
      this.disabled = true;
    });
  });

}); // End of DOMContentLoaded