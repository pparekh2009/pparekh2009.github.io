// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

// Hero subtitle typing animation
(function () {
    const el = document.getElementById('typing-subtitle');
    if (!el) return;

    const text = 'SOFTWARE DEVELOPER';
    const typeSpeed = 100;
    const eraseSpeed = 60;
    const holdTime = 1800;
    const pauseTime = 600;

    let charIndex = 0;

    function type() {
        el.textContent = text.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex < text.length) {
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(erase, holdTime);
        }
    }

    function erase() {
        charIndex--;
        el.textContent = text.slice(0, charIndex);
        if (charIndex > 0) {
            setTimeout(erase, eraseSpeed);
        } else {
            setTimeout(type, pauseTime);
        }
    }

    type();
})();

// On devices with no hover (touch), tap a project card image to reveal its
// description, tap again to close it. Delegated on document since some cards
// (all_projects.html) are created dynamically after this script runs.
(function () {
    if (!window.matchMedia('(hover: none)').matches) return;

    document.addEventListener('click', (e) => {
        const image = e.target.closest('.card-custom-image');
        if (image) {
            image.classList.toggle('overlay-open');
        }
    });
})();

// Close the mobile nav menu after tapping a section link
(function () {
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
            }
        });
    });
})();