// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and tip elements
document.querySelectorAll('.feature-card, .tip').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-element.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Accessibility: Reduce motion */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// Track page performance
if (window.performance) {
    window.addEventListener('load', function () {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Escape key to close any potential modals/dropdowns
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
});

// Log page view for analytics
console.log('TypingQuick - Learn to Type Fast');
console.log('Visit: https://typingquick.com/')