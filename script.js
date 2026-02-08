// ========================================
// Navbar scroll effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Mobile navigation toggle
// ========================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================================
// Scroll-triggered animations
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll(
    '.highlight-card, .timeline-item, .skill-category, .education-card, .quote-block, .contact-card'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========================================
// Skill bar animation on scroll
// ========================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        fill.style.width = targetWidth;
                    });
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => {
    skillObserver.observe(cat);
});

// ========================================
// Active nav link highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--color-primary-light)';
                link.style.background = 'rgba(99, 102, 241, 0.1)';
            } else {
                link.style.color = '';
                link.style.background = '';
            }
        }
    });
});
