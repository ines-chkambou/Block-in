// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all card elements
document.querySelectorAll('.about-card, .gameplay-card, .feature-item, .block-type').forEach(el => {
    observer.observe(el);
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar active state on scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-gold)';
        }
    });
});

// Download button click handlers
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.textContent.trim();
        alert(`Thank you for your interest! Block In for ${platform} is coming soon!\n\nStay tuned for the release date.`);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 700) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Animate numbers on page load
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to interactive elements
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    console.log('Block In website loaded successfully!');
});

// Theme toggle (default / christmas)
(function() {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('site-theme');
    const defaultTheme = saved || 'default';
    if (defaultTheme === 'christmas') body.setAttribute('data-theme', 'christmas');

    function updateToggle() {
        const isChristmas = body.getAttribute('data-theme') === 'christmas';
        toggle.textContent = isChristmas ? '🌐' : '🎄';
    }

    toggle.addEventListener('click', () => {
        const isChristmas = body.getAttribute('data-theme') === 'christmas';
        if (isChristmas) {
            body.removeAttribute('data-theme');
            localStorage.setItem('site-theme', 'default');
        } else {
            body.setAttribute('data-theme', 'christmas');
            localStorage.setItem('site-theme', 'christmas');
        }
        updateToggle();
    });

    updateToggle();
})();

// Snowfall generator
(function() {
    const snowContainer = document.querySelector('.snow');
    if (!snowContainer) return;

    const flakes = 60;
    const viewportW = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    function random(min, max) { return Math.random() * (max - min) + min; }

    for (let i = 0; i < flakes; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄️';

        const size = Math.floor(random(12, 28));
        flake.style.fontSize = size + 'px';
        flake.style.left = random(0, viewportW()) + 'px';
        flake.style.opacity = random(0.6, 1);
        flake.style.setProperty('--fall-duration', random(6, 14) + 's');
        flake.style.setProperty('--sway-duration', random(3, 6) + 's');
        flake.style.setProperty('--sway', Math.floor(random(-120, 120)) + 'px');

        // stagger start
        flake.style.animationDelay = (random(0, 8)) + 's';

        snowContainer.appendChild(flake);
    }

    // reposition flakes on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.snowflake').forEach(f => {
                f.style.left = Math.random() * viewportW() + 'px';
            });
        }, 250);
    });
})();
