/* ==========================================
   DeepGenX Enterprise Website
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Fade-Up Animation
    ========================== */

    const fadeElements = document.querySelectorAll(".fade-up");

    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    fadeElements.forEach(el => fadeObserver.observe(el));



    /* ==========================
       Animated Stats Counter
    ========================== */

    const counters = document.querySelectorAll("[data-counter]");

    const animateCounter = (counter) => {

        const target = parseInt(counter.dataset.counter);
        const duration = 1800;

        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {

            start += increment;

            if (start < target) {

                counter.textContent =
                    Math.floor(start).toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString();
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.4
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });



    /* ==========================
       Navbar Background on Scroll
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 25px rgba(15,23,42,.08)";

            header.style.background =
                "rgba(255,255,255,.95)";

        } else {

            header.style.boxShadow = "none";

            header.style.background =
                "rgba(255,255,255,.88)";
        }
    });



    /* ==========================
       Smooth Anchor Scrolling
    ========================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const targetID =
                    this.getAttribute("href");

                if (targetID === "#") return;

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });

        });



    /* ==========================
       Contact Form Validation
    ========================== */

    const form =
        document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                form.querySelector('input[name="name"]');

            const email =
                form.querySelector('input[name="email"]');

            const company =
                form.querySelector('input[name="company"]');

            const message =
                form.querySelector('textarea[name="message"]');

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;
            }

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }

            alert(
                "Thank you. A DeepGenX consultant will contact you shortly."
            );

            form.reset();

        });
    }



    /* ==========================
       Hero Card Hover Effect
    ========================== */

    const cards =
        document.querySelectorAll(
            ".service-card, .industry-card, .feature"
        );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0)";
        });

    });



    /* ==========================
       Button Ripple Effect
    ========================== */

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width =
                ripple.style.height =
                `${size}px`;

            ripple.style.position = "absolute";
            ripple.style.borderRadius = "50%";
            ripple.style.pointerEvents = "none";

            ripple.style.left =
                `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${e.clientY - rect.top - size / 2}px`;

            ripple.style.background =
                "rgba(255,255,255,.35)";

            ripple.style.transform =
                "scale(0)";

            ripple.style.animation =
                "ripple .6s ease-out";

            this.style.position = "relative";
            this.style.overflow = "hidden";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });



    /* ==========================
       Active Nav Link Highlight
    ========================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.clientHeight;

            if (
                pageYOffset >= sectionTop &&
                pageYOffset <
                sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    });

});


/* ==========================================
   Dynamic Ripple Animation Style
========================================== */

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `
@keyframes ripple {
    from{
        transform:scale(0);
        opacity:1;
    }
    to{
        transform:scale(4);
        opacity:0;
    }
}

.nav-links a.active{
    color:#2563eb;
    font-weight:700;
}
`;

document.head.appendChild(rippleStyle);