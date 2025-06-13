document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll("nav a");

  // Crea elemento per la transizione
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);

  // Menu mobile
  if (window.innerWidth <= 768) {
    navLinks.classList.remove("active");
  }

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

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

  // Resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
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

  // 🔐 Gestione toggle password (multipli)
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
  

  setupPasswordToggle("password", "togglePassword");
  setupPasswordToggle("confirmPassword", "toggleConfirmPassword");
});
 const usernameInput = document.getElementById('username');
  const usernameError = document.getElementById('usernameError');

  usernameInput.addEventListener('input', function () {
    const pattern = /^[a-zA-Z0-9]*$/; // solo lettere e numeri
    if (!pattern.test(this.value)) {
      this.classList.add('invalid');
      usernameError.style.display = 'block';
    } else {
      this.classList.remove('invalid');
      usernameError.style.display = 'none';
    }
  });
  
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  emailInput.addEventListener('input', function () {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(this.value)) {
      this.classList.add('invalid');
      emailError.style.display = 'block';
    } else {
      this.classList.remove('invalid');
      emailError.style.display = 'none';
    }
  });
const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  function validatePasswordFields() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validazione lunghezza password
    if (password.length < 8) {
      passwordInput.classList.add('invalid');
      passwordError.style.display = 'block';
    } else {
      passwordInput.classList.remove('invalid');
      passwordError.style.display = 'none';
    }

    // Validazione conferma password
    if (confirmPassword !== password && confirmPassword !== '') {
      confirmPasswordInput.classList.add('invalid');
      confirmPasswordError.style.display = 'block';
    } else {
      confirmPasswordInput.classList.remove('invalid');
      confirmPasswordError.style.display = 'none';
    }
  }

  passwordInput.addEventListener('input', validatePasswordFields);
  confirmPasswordInput.addEventListener('input', validatePasswordFields);




