// Global navigation and utility functions

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    highlightCurrentPage();
});

// Search functionality
function initializeSearch() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
                this.value = '';
            }
        });
    }
}

function handleSearch(query) {
    if (query.trim()) {
        alert('Search functionality coming soon! You searched for: ' + query);
        // TODO: Implement actual search functionality
    }
}

// Navigation highlighting
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop().replace('.html', '');
            if (linkPage === currentPage || 
                (currentPage === 'index' && linkPage === 'index.html') ||
                (currentPage === '' && linkPage === 'index.html')) {
                link.style.color = '#A8C686';
            }
        }
    });
}

// Smooth scroll to top utility
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}
