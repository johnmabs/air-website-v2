//
document.addEventListener("DOMContentLoaded", function () {
  // Header section and menu

  const siteHeader = document.querySelector(".site-header");
  const scrollWatcher = document.createElement("div");

  const btnOpen = document.querySelector("#btnOpen");
  const btnClose = document.querySelector("#btnClose");
  const media = window.matchMedia("(width < 56.25em)");
  const primaryNavigation = document.querySelector(".primary-navigation");
  const main = document.querySelector("main");
  const body = document.querySelector("body");

  scrollWatcher.setAttribute("data-scroll-watcher", "");
  siteHeader?.before(scrollWatcher);

  const navObserver = new IntersectionObserver((entries) => {
    siteHeader?.classList.toggle("sticking", !entries[0].isIntersecting);
  });

  navObserver.observe(scrollWatcher);

  function setupPrincipalNav(e) {
    if (e.matches) {
      // is mobile
      console.log("is mobile");
      primaryNavigation.setAttribute("inert", "");
      primaryNavigation.style.transition = "none";
    } else {
      // is  tablet / desktop
      console.log("is desktop");
      closeMobileMenu();
      primaryNavigation.removeAttribute("inert");
    }
  }

  function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    primaryNavigation.removeAttribute("inert");
    primaryNavigation.removeAttribute("style");
    main.setAttribute("inert", "");
    bodyScrollLockUpgrade.disableBodyScroll(body);
    btnClose.focus();
  }

  function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    primaryNavigation.setAttribute("inert", "");
    main.removeAttribute("inert");
    bodyScrollLockUpgrade.enableBodyScroll(body);
    btnOpen.focus();

    setTimeout(() => {
      primaryNavigation.style.transition = "none";
    }, 500);
  }

  setupPrincipalNav(media);

  btnOpen.addEventListener("click", openMobileMenu);
  btnClose.addEventListener("click", closeMobileMenu);

  media.addEventListener("change", function (e) {
    setupPrincipalNav(e);
  });

  // testimonials slider
  const slider = document.querySelector(".testimonial-slider"); // Get the main container
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  const autoSlideInterval = 5000; // Time in milliseconds (5 seconds)
  let intervalId; // Variable to hold the interval ID

  // Function to show a specific slide
  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");
    slides[index].classList.add("active");
  }

  // Function to show the next slide
  function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Function to show the previous slide
  function showPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Function to start the automatic slide transition
  function startAutoSlide() {
    intervalId = setInterval(showNextSlide, autoSlideInterval);
  }

  // Function to stop and restart the automatic slide
  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }

  // Event Listeners for buttons
  nextBtn.addEventListener("click", () => {
    showNextSlide();
    resetAutoSlide(); // Reset timer on manual click
  });

  prevBtn.addEventListener("click", () => {
    showPrevSlide();
    resetAutoSlide(); // Reset timer on manual click
  });

  // Navigating with dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Pause autoslide on hover ---
  slider.addEventListener("mouseenter", () => {
    clearInterval(intervalId); // Pause on hover
  });

  slider.addEventListener("mouseleave", () => {
    startAutoSlide(); // Resume on mouse leave
  });

  // Initialize the slider by showing the first slide
  showSlide(currentSlide);
  startAutoSlide(); // Start the autoslide feature on page load
});
