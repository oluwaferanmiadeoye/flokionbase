 // Loading screen
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.getElementById("loading").classList.add("hidden");
        }, 1500);
      });

      // Mobile menu toggle
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileNav = document.getElementById("mobileNav");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  mobileNav.classList.toggle("active");
  
  // Toggle body scroll
  if (mobileNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenuToggle.classList.remove("active");
          mobileNav.classList.remove("active");
        });
      });

      // Navbar scroll effect
      const navbar = document.getElementById("navbar");
      let lastScrollY = window.scrollY;

      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        lastScrollY = currentScrollY;
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Active navigation link highlighting
      const navLinks = document.querySelectorAll(".nav-link");
      const sections = document.querySelectorAll("section");

      window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });

      // Intersection Observer for animations
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

      // Interactive hover effects for cards
      document.querySelectorAll(".feature-card, .stat-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-15px)";
        });

        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      });

      // Button click effects
      document
        .querySelectorAll(".btn-primary, .btn-secondary")
        .forEach((btn) => {
          btn.addEventListener("click", function (e) {
            // Create ripple effect
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
          `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
          });
        });

      // Add ripple animation CSS
      const style = document.createElement("style");
      style.textContent = `
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Social link hover effects
      document.querySelectorAll(".social-link").forEach((link) => {
        link.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-4px) rotate(5deg)";
        });

        link.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) rotate(0deg)";
        });
      });

      // Performance optimization - debounce scroll events
      let ticking = false;

      function updateOnScroll() {
        // Update scroll-based animations here if needed
        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      }

      // Easter egg - Konami code
      let konamiCode = [];
      const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

      document.addEventListener("keydown", (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
          konamiCode.shift();
        }

        if (konamiCode.join(",") === konami.join(",")) {
          // Easter egg activated - add some fun effects
          document.body.style.animation = "rainbow 2s ease infinite";
          setTimeout(() => {
            document.body.style.animation = "";
          }, 5000);
        }
      });

      // Add rainbow animation for easter egg
      const rainbowStyle = document.createElement("style");
      rainbowStyle.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(rainbowStyle);

      // Preload critical resources for better performance
      const preloadResources = () => {
        // Preload important images or fonts if needed
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "font";
        link.type = "font/woff2";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      };

      preloadResources();

      // Initialize all animations and effects when DOM is ready
      document.addEventListener("DOMContentLoaded", () => {
        // Trigger initial fade-in animations for elements in viewport
        document.querySelectorAll(".fade-in").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible");
          }
        });
      });