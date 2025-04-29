document.addEventListener('DOMContentLoaded', () => {

    // --- Star Field Generation and Parallax (Keep as is) ---
    const starContainer = document.getElementById('stars-background');
    if (starContainer) {
        // ... (Keep the exact same star generation and mouse parallax code) ...
        const numStars = 120; const stars = []; /* ... etc ... */
         function onMouseMove(event) { /* ... */ } function updateParallax() { /* ... */ }
         document.body.addEventListener('mousemove', onMouseMove); requestAnimationFrame(updateParallax); document.body.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    }

    // --- Hero Animation Trigger ---
    // Assign animation delays from data attributes for pop-in
    const heroItems = document.querySelectorAll('#hero [data-animate="pop-in"]');
    heroItems.forEach(item => {
        const delay = item.dataset.delay || '0s';
        item.style.setProperty('--animation-delay', delay); // Use CSS variable
    });


    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const targetSection = entry.target;
                targetSection.classList.add('section-revealed'); // Add trigger class to section

                // Find all animatable items within THAT section
                const itemsToAnimate = targetSection.querySelectorAll('.animate-item');

                itemsToAnimate.forEach((item, itemIndex) => {
                    // Calculate stagger delay: base delay + index * increment
                    const baseDelay = 0; // Start delay for the first item in the section
                    const staggerIncrement = 0.1; // Delay in seconds between items
                    const totalDelay = baseDelay + itemIndex * staggerIncrement;

                    item.style.transitionDelay = `${totalDelay}s`; // Apply delay directly
                });

                observer.unobserve(targetSection); // Stop observing once revealed
            }
        });
    };

    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections that need animation
    const sectionsToAnimate = document.querySelectorAll('.needs-animation');
    sectionsToAnimate.forEach(section => {
        animationObserver.observe(section);
    });

    // --- Footer Year Update ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded
