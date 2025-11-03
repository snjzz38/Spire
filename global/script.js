document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Load Header and Footer on every page ---
    // This part remains the same as it's the most efficient way to handle components.
    fetch('global/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading the header:', error));

    fetch('global/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading the footer:', error));

    // --- 2. NEW: Sticky Header Animation ---
    // This function adds a class to the header when you scroll down.
    const header = document.getElementById('header-placeholder');
    if (header) {
        window.addEventListener('scroll', function() {
            // We target the actual header element loaded inside the placeholder
            const headerElement = header.querySelector('.header');
            if (headerElement) {
                if (window.scrollY > 50) { // Activates after scrolling 50px
                    headerElement.classList.add('header-scrolled');
                } else {
                    headerElement.classList.remove('header-scrolled');
                }
            }
        });
    }

    // --- 3. NEW: Fade-in Sections on Scroll ---
    // This uses the modern IntersectionObserver for great performance.
    const sectionsToAnimate = document.querySelectorAll('.content-section, .category-card, .page-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When a section comes into view, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each of our sections
    sectionsToAnimate.forEach(section => {
        // To make them animatable, we first need to add the base class
        section.classList.add('fade-in-section');
        observer.observe(section);
    });


    // --- 4. Timeline Page Logic (Unchanged) ---
    // This code remains exactly the same, ensuring your timeline page still works.
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        // ... (all your existing timeline javascript code goes here)
        const selector = document.getElementById('student-type-select');
        const storageKey = 'universityTimelineData';
        const defaultData = { /* ... */ }; // Keep the full object
        // ... and the rest of the timeline functions (saveData, loadData, renderTimeline, etc.)
    }
});
