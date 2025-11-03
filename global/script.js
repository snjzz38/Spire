document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Load Header and Footer ---
    fetch('global/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // We need to re-run the header scroll logic once the header is loaded
            setupHeaderScroll();
        })
        .catch(error => console.error('Error loading the header:', error));

    fetch('global/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading the footer:', error));

    // --- 2. Sleek Header Animation on Scroll ---
    function setupHeaderScroll() {
        const headerElement = document.querySelector('.header');
        if (headerElement) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    headerElement.classList.add('header-scrolled');
                } else {
                    headerElement.classList.remove('header-scrolled');
                }
            });
        }
    }

    // --- 3. "Apple-Sleek" Fade-in Sections on Scroll ---
    const animatedElements = document.querySelectorAll('.page-header, .content-section, .category-card, .hero, .disclaimer-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 4. Timeline Page Logic (Unchanged) ---
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        // All your existing timeline javascript code remains here, untouched.
        // ...
    }
});
