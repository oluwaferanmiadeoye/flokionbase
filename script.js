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
          document.body.style.overflow = "";
        });
      });

      // Navbar scroll effect
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
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

      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Meme slider functionality
      let currentSlide = 0;
      const slides = document.querySelectorAll(".meme-slide");
      const totalSlides = slides.length;

      function showSlide(n) {
        slides.forEach((slide) => slide.classList.remove("active"));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add("active");
      }

      function nextSlide() {
        showSlide(currentSlide + 1);
      }

      function previousSlide() {
        showSlide(currentSlide - 1);
      }

      // Auto-advance slides every 5 seconds
      setInterval(nextSlide, 5000);

      // Download current meme
      function downloadCurrentMeme() {
        const currentImg = slides[currentSlide].querySelector("img");
        const link = document.createElement("a");
        link.download = `based-floki-meme-${currentSlide + 1}.jpg`;
        link.href = currentImg.src;
        link.click();
      }

      // Button click effects
      document
        .querySelectorAll(
          ".btn-primary, .btn-secondary, .slider-btn, .download-btn"
        )
        .forEach((btn) => {
          btn.addEventListener("click", function (e) {
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

      // Initialize animations when DOM is ready
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".fade-in").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible");
          }
        });
      });