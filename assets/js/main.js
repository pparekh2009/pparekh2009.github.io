AOS.init();

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

// Stats row count-up on scroll into view
(function () {
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;

    const numbers = statsRow.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCount(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                numbers.forEach(animateCount);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsRow);
})();