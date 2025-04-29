document.addEventListener('DOMContentLoaded', () => {

    const starContainer = document.getElementById('stars-background');
    if (starContainer) {
        const numStars = 120; const stars = []; 
         function onMouseMove(event) { /* ... */ } function updateParallax() { /* ... */ }
         document.body.addEventListener('mousemove', onMouseMove); requestAnimationFrame(updateParallax); document.body.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    }

    const heroItems = document.querySelectorAll('#hero [data-animate="pop-in"]');
    heroItems.forEach(item => {
        const delay = item.dataset.delay || '0s';
        item.style.setProperty('--animation-delay', delay); 
    });


    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const targetSection = entry.target;
                targetSection.classList.add('section-revealed'); 

                const itemsToAnimate = targetSection.querySelectorAll('.animate-item');

                itemsToAnimate.forEach((item, itemIndex) => {
                    const baseDelay = 0;
                    const staggerIncrement = 0.1; 
                    const totalDelay = baseDelay + itemIndex * staggerIncrement;

                    item.style.transitionDelay = `${totalDelay}s`; 
                });

                observer.unobserve(targetSection); 
            }
        });
    };

    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

    const sectionsToAnimate = document.querySelectorAll('.needs-animation');
    sectionsToAnimate.forEach(section => {
        animationObserver.observe(section);
    });

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); 
