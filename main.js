$(document).ready(function () {
  // ========== HAMBURGER MENU TOGGLE ==========
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll("nav a");

  // Menu mobile inizializzazione
  if (window.innerWidth <= 768) {
    navLinks.classList.remove("active");
  }

  $('#hamburger').click(function () {
    $('#navLinks').toggleClass('active');
  });

  // Resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
  });

  // ========== LIGHT SLIDERS ==========
  $('#autoWidth1, #autoWidth2, #autoWidth3, #autoWidth4').each(function () {
    $(this).lightSlider({
      autoWidth: true,
      loop: true,
      onSliderLoad: function () {
        $(this).removeClass('cs-hidden');
      }
    });
  });

  // ========== SWIPER ==========
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      depth: 500,
      modifier: 1,
      scale: 0.75,
      slideShadows: false,
      stretch: -100,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    },
    onAny: function(event, ...args) {
      if (event === "slideChangeTransitionStart") {
        const index = args && args[0].realIndex;
        const price = ["550", "550", "550", "550", "550"];
        const priceEl = document.getElementById("select-price");
        
        if (priceEl && typeof index === 'number') {
          priceEl.innerText = price[index];
        }
        
        const selectCards = document.querySelectorAll(".select__card");
        selectCards.forEach((item) => {
          item.classList.remove("show__info");
        });
        if (selectCards[index]) selectCards[index].classList.add("show__info");
      }
    }
  });

  // ========== PAGE TRANSITIONS ==========
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);

  // Gestione click sui link
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.target === '_blank') return;

      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (this.href !== window.location.href) {
        e.preventDefault();
        transitionElement.style.display = 'block';
        transitionElement.classList.remove('slide-in');

        requestAnimationFrame(() => {
          transitionElement.classList.add('slide-out');

          setTimeout(() => {
            window.location.href = link.getAttribute('href');
          }, 800);
        });
      }
    });
  });

  // Animazione di entrata
  setTimeout(() => {
    transitionElement.style.display = 'block';
    transitionElement.classList.remove('slide-out');
    transitionElement.classList.add('slide-in');

    setTimeout(() => {
      transitionElement.style.display = 'none';
    }, 1200);
  }, 50);

  // ========== ANIMAZIONI AL CARICAMENTO ==========
  const elements = document.querySelectorAll('.header__container, .section__header1, .box, .location__container, .select__container, .banner__container, .download');
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 * index);
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const scrollRevealOption = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  };

  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal(".header__container h1", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".header__container form", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__container img", {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal(".range__card", {
      duration: 1000,
      interval: 500,
    });

    ScrollReveal().reveal(".location__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".location__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".location__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".location__content .location__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".story__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".download__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".download__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".download__links", {
      ...scrollRevealOption,
      delay: 1000,
    });
  } else {
    console.warn("⚠️ ScrollReveal non è definito. Assicurati di includere la libreria.");
  }

  // ========== BANNER INFINITE SCROLL ==========
  const banner = document.querySelector(".banner__wrapper");
  if (banner) {
    const bannerContent = Array.from(banner.children);
    bannerContent.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      banner.appendChild(duplicateNode);
    });
  }

  // ========== PASSWORD TOGGLE (se presente nella pagina) ==========
  function setupPasswordToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input && icon) {
      icon.addEventListener("click", () => {
        const isVisible = input.type === "text";
        input.type = isVisible ? "password" : "text";
        icon.classList.toggle("fa-lock", isVisible);
        icon.classList.toggle("fa-lock-open", !isVisible);
      });
    }
  }

  if (document.getElementById("password")) {
    setupPasswordToggle("password", "togglePassword");
    setupPasswordToggle("confirmPassword", "toggleConfirmPassword");
  }

  // ========== SCROLL ARROW ==========
  const scrollArrow = document.getElementById("scroll-arrow");
  if (scrollArrow) {
    const arrowIcon = scrollArrow.querySelector("i");
    
    function updateArrow() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        arrowIcon.classList.remove("ri-arrow-down-s-line");
        arrowIcon.classList.add("ri-arrow-up-s-line");
        scrollArrow.onclick = () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      } else {
        arrowIcon.classList.remove("ri-arrow-up-s-line");
        arrowIcon.classList.add("ri-arrow-down-s-line");
        scrollArrow.onclick = () => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        };
      }
    }

    updateArrow();
    window.addEventListener("scroll", updateArrow);
  }
});