import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";

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

  scrollWatcher?.setAttribute("data-scroll-watcher", "");
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
    disableBodyScroll(body);
    btnClose.focus();
  }

  function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    primaryNavigation.setAttribute("inert", "");
    main.removeAttribute("inert");
    enableBodyScroll(body);
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
    dots[index]?.classList.add("active");
    slides[index]?.classList.add("active");
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
  nextBtn?.addEventListener("click", () => {
    showNextSlide();
    resetAutoSlide(); // Reset timer on manual click
  });

  prevBtn?.addEventListener("click", () => {
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
  slider?.addEventListener("mouseenter", () => {
    clearInterval(intervalId); // Pause on hover
  });

  slider?.addEventListener("mouseleave", () => {
    startAutoSlide(); // Resume on mouse leave
  });

  // Initialize the slider by showing the first slide
  showSlide(currentSlide);
  startAutoSlide(); // Start the autoslide feature on page load

  // Gallery
  const images = [
    {
      url: "/assets/img/gallery/001.jpg",
      alt: "AIR à la rentrée du livre gabonais à Paris avec Mme l'ambassadrice du Gabon en France, en décembre 2024.",
      description:
        "AIR à la rentrée du livre gabonais à Paris avec Mme l'ambassadrice du Gabon en France, en décembre 2024.",
    },
    {
      url: "/assets/img/gallery/002.jpg",
      alt: "AIR intervient à la conférence pour la Journée mondiale de la prématurité au CHU d'Angré, à Abidjan.",
      description:
        "AIR intervient à la conférence pour la Journée mondiale de la prématurité au CHU d'Angré, à Abidjan.",
    },
    {
      url: "/assets/img/gallery/003.jpg",
      alt: "AIR était présent sur le plateau télé de l'émission Femme et pouvoir.",
      description:
        "AIR était présent sur le plateau télé de l'émission Femme et pouvoir.",
    },
    {
      url: "/assets/img/gallery/004.jpg",
      alt: "Intervention sur la résilience à l'occasion de la Journée de la femme gabonaise.",
      description:
        "Intervention sur la résilience à l'occasion de la Journée de la femme gabonaise.",
    },
    {
      url: "/assets/img/gallery/005.jpg",
      alt: "AIR a reçu une distinction de la femme conférencière engagée pour la santé mentale en Afrique, lors de la Semaine africaine des solutions, qui s'est tenue dans le 16e arrondissement de Paris.",
      description:
        "AIR a reçu une distinction de la femme conférencière engagée pour la santé mentale en Afrique, lors de la Semaine africaine des solutions, qui s'est tenue dans le 16e arrondissement de Paris.",
    },
    {
      url: "/assets/img/gallery/006.jpg",
      alt: "Interview au salon Osiane sur l'intelligence artificielle et la santé mentale.",
      description:
        "Interview au salon Osiane sur l'intelligence artificielle et la santé mentale.",
    },
    {
      url: "/assets/img/gallery/007.jpg",
      alt: "AIR présente sa proposition d'application pour venir en aide aux victimes lors du salon international OSIANE.",
      description:
        "AIR présente sa proposition d'application pour venir en aide aux victimes lors du salon international OSIANE.",
    },
    {
      url: "/assets/img/gallery/008.jpg",
      alt: "Avril 2025, deuxième édition de la conférence sur les blessures émotionnelles intra-familiales, Paris, France.",
      description:
        "Avril 2025, deuxième édition de la conférence sur les blessures émotionnelles intra-familiales, Paris, France.",
    },
    {
      url: "/assets/img/gallery/009.jpg",
      alt: "Au Studio Télé Sud, le 8 mars 2025, aux côtés de Régine Komokoli, Christine Jean Bruno et Sadio Kante.",
      description:
        "Au Studio Télé Sud, le 8 mars 2025, aux côtés de Régine Komokoli, Christine Jean Bruno et Sadio Kante.",
    },
    {
      url: "/assets/img/gallery/010.jpg",
      alt: "À la mairie de Montfermeil, sur les dégâts dévastateurs de la violence psychologique, 2025.",
      description:
        "À la mairie de Montfermeil, sur les dégâts dévastateurs de la violence psychologique, 2025.",
    },
    {
      url: "/assets/img/gallery/011.jpg",
      alt: "Rabat, Maroc, octobre 2024 : conférence à l'université Mohammed V sur l'appel à des initiatives positives pour l'Afrique.",
      description:
        "Rabat, Maroc, octobre 2024 : conférence à l'université Mohammed V sur l'appel à des initiatives positives pour l'Afrique.",
    },
    {
      url: "/assets/img/gallery/012.jpg",
      alt: "Émission Femme générationnelle de septembre 2024 sur la transformation du brisement divin.",
      description:
        "Émission Femme générationnelle de septembre 2024 sur la transformation du brisement divin.",
    },
  ];

  // Sélectionne la galerie
  const gallery = document.querySelector(".gallery");

  // Variable pour suivre l'index de l'image actuelle
  let currentImageIndex = 0;

  // Ajoute les images à la galerie
  // images.forEach((imageObj) => {
  //   const img = document.createElement("img");
  //   img.src = imageObj.url;
  //   img.alt = imageObj.alt;
  //   img.addEventListener("click", () => openLightbox(imageObj));
  //   gallery.appendChild(img);
  // });

  images?.forEach((imageObj) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "gallery-item";

    const img = document.createElement("img");
    img.src = imageObj.url;
    img.alt = imageObj.alt;

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const text = document.createElement("p");
    text.className = "image-text";
    text.textContent = imageObj.description; // Texte personnalisable

    overlay.appendChild(text);
    imgContainer.appendChild(img);
    imgContainer.appendChild(overlay);

    imgContainer.addEventListener("click", () => openLightbox(imageObj));

    gallery.appendChild(imgContainer);
  });

  // Fonction pour ouvrir la lightbox
  function openLightbox(imageObj) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxText = document.getElementById("lightbox-text");

    lightboxImage.src = imageObj.url;
    lightboxText.textContent = imageObj.description;
    lightbox.style.display = "block";

    // Bloque le scroll de la page
    document.body.classList.add("body-no-scroll");
  }

  // Ferme la lightbox
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "none";
    document.body.classList.remove("body-no-scroll");
  });

  // Passe à l'image suivante
  document.querySelector(".next").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById("lightbox-image").src =
      images[currentImageIndex].url;
    document.getElementById("lightbox-text").textContent =
      images[currentImageIndex].description;
  });

  // Passe à l'image précédente
  document.querySelector(".prev").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById("lightbox-image").src =
      images[currentImageIndex].url;
    document.getElementById("lightbox-text").textContent =
      images[currentImageIndex].description;
  });

  // Ferme la lightbox si on clique en dehors de l'image
  document.getElementById("lightbox").addEventListener("click", (e) => {
    // Ne ferme la lightbox que si on clique sur le fond (et pas sur l'image, les flèches ou la croix)
    if (
      e.target === document.getElementById("lightbox") ||
      (e.target.classList.contains("lightbox-content") === false &&
        !e.target.classList.contains("prev") &&
        !e.target.classList.contains("next") &&
        !e.target.classList.contains("close"))
    ) {
      document.getElementById("lightbox").style.display = "none";
      document.body.classList.remove("body-no-scroll");
    }
  });

  // Fonction pour recalculer la disposition (si nécessaire)
  function updateGalleryLayout() {
    // Ici, tu peux ajouter du code pour recalculer la disposition si tu utilises une librairie comme Masonry.js.
    // Pour une solution pure CSS, cette fonction peut rester vide.
  }

  // Écouteur pour le redimensionnement de la fenêtre
  window.addEventListener("resize", updateGalleryLayout);
});
