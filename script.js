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

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // Smooth Scrolling
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

  // Navbar Background on Scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Fade-in Animations
  const animatedElements = document.querySelectorAll(
    ".service-card, .industry-card, .feature-card, .about-card"
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
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // Contact Form
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      if (submitButton) {
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        setTimeout(() => {
          alert(
            "Thank you for contacting DeepGenX. We'll get back to you shortly."
          );

          contactForm.reset();

          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1200);
      }
    });
  }

  // Counter Animation
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1500;
    const increment = target / (duration / 16);

    let current = 0;

    const update = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
});

// Utility: Scroll to Top Button
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
