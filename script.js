// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.getElementById('scrollTop');
const statNumbers = document.querySelectorAll('.stat-number');
const navLinkItems = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');

// ===== Theme Switching =====
let leavesContainer = null;
let leavesInterval = null;
let isTransitioning = false;

function createTransitionOverlay() {
    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.theme-transition-overlay');
    if (existingOverlay) existingOverlay.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'nature') {
        document.body.classList.add('nature-theme');
        if (themeToggle) themeToggle.checked = true;
        createLeavesContainer();
        startLeaves();
    }
}

function toggleTheme() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const goingToNature = !document.body.classList.contains('nature-theme');
    const overlay = createTransitionOverlay();
    
    // Add appropriate transition class
    if (goingToNature) {
        overlay.classList.add('nature-transition');
        // Add clouds and bushes elements
        overlay.innerHTML = `
            <div class="transition-clouds">
                <div class="t-cloud t-cloud-1"></div>
                <div class="t-cloud t-cloud-2"></div>
                <div class="t-cloud t-cloud-3"></div>
            </div>
            <div class="transition-bushes">
                <div class="t-bush t-bush-1"></div>
                <div class="t-bush t-bush-2"></div>
                <div class="t-bush t-bush-3"></div>
                <div class="t-bush t-bush-4"></div>
                <div class="t-bush t-bush-5"></div>
            </div>
            <div class="transition-sun"></div>
        `;
    } else {
        overlay.classList.add('cosmic-transition');
        // Add stars and cosmic elements
        overlay.innerHTML = `
            <div class="transition-stars"></div>
            <div class="transition-moon"></div>
            <div class="transition-sparkles">
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
                <div class="t-sparkle"></div>
            </div>
        `;
    }
    
    // Trigger animation
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    // At peak of transition, switch the theme
    setTimeout(() => {
        document.body.classList.toggle('nature-theme');
        localStorage.setItem('portfolio-theme', goingToNature ? 'nature' : 'dark');
        
        if (goingToNature) {
            createLeavesContainer();
            startLeaves();
            const particles = document.querySelector('.particles');
            if (particles) particles.style.display = 'none';
        } else {
            stopLeaves();
            let particles = document.querySelector('.particles');
            if (particles) {
                particles.style.display = 'block';
            } else {
                createParticles();
            }
        }
    }, 800);
    
    // Start exit animation
    setTimeout(() => {
        overlay.classList.add('exit');
    }, 1000);
    
    // Remove overlay after animation completes
    setTimeout(() => {
        overlay.remove();
        isTransitioning = false;
    }, 1800);
}

if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
}

// ===== Floating Leaves System =====
function createLeavesContainer() {
    if (leavesContainer) return;
    
    leavesContainer = document.createElement('div');
    leavesContainer.className = 'leaves-container';
    document.body.appendChild(leavesContainer);
}

function createLeaf() {
    if (!leavesContainer || !document.body.classList.contains('nature-theme')) return;
    
    const leaf = document.createElement('div');
    const sizes = ['small', 'medium', 'large'];
    const leafTypes = ['leaf-1', 'leaf-2', 'leaf-3', 'leaf-4', 'leaf-5'];
    
    leaf.className = `leaf ${sizes[Math.floor(Math.random() * sizes.length)]} ${leafTypes[Math.floor(Math.random() * leafTypes.length)]}`;
    leaf.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>`;
    
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.animationDuration = `${8 + Math.random() * 7}s`;
    leaf.style.animationDelay = `${Math.random() * 2}s`;
    leaf.style.animation = `leafFall ${8 + Math.random() * 7}s linear forwards`;
    
    leavesContainer.appendChild(leaf);
    
    // Remove leaf after animation
    setTimeout(() => {
        if (leaf.parentNode) {
            leaf.parentNode.removeChild(leaf);
        }
    }, 15000);
}

function startLeaves() {
    if (leavesInterval) return;
    
    // Create initial leaves
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createLeaf(), i * 400);
    }
    
    // Continue creating leaves
    leavesInterval = setInterval(() => {
        if (document.body.classList.contains('nature-theme')) {
            createLeaf();
        }
    }, 1200);
}

function stopLeaves() {
    if (leavesInterval) {
        clearInterval(leavesInterval);
        leavesInterval = null;
    }
    if (leavesContainer) {
        leavesContainer.innerHTML = '';
    }
}

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Scroll to Top =====
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Update Active Nav Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Counter Animation =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 3000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// Counter animation observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(num => counterObserver.observe(num));

// Reveal animation observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add reveal class to elements
document.querySelectorAll('.skill-item, .project-card, .project-card-ui, .about-content, .about-image, .contact-content, .contact-form-wrapper, .tech-stacks-pro, .interest-areas-pro').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Animate professional tool badges on scroll
const toolProObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-pro, .interest-pro').forEach(badge => {
    badge.style.animationPlayState = 'paused';
    toolProObserver.observe(badge);
});


// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== Typing Effect for Hero =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glows = document.querySelectorAll('.glow');
    
    glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.1;
        glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Mouse Move Effect on Hero Image =====
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

// ===== Project Card UI Hover Effects =====
document.querySelectorAll('.project-card-ui').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// ===== Skill Items Hover Effect =====
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// ===== Create Floating Cosmic Particles =====
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Moon position to avoid (top-right area: right 15%, top 10%)
    const moonArea = { minX: 75, maxX: 95, minY: 5, maxY: 25 };
    
    // Check if position is in moon area
    function isInMoonArea(x, y) {
        return x >= moonArea.minX && x <= moonArea.maxX && y >= moonArea.minY && y <= moonArea.maxY;
    }
    
    // Get random position avoiding moon
    function getRandomPosition() {
        let x, y;
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
        } while (isInMoonArea(x, y));
        return { x, y };
    }
    
    // Cosmic particle types
    const particleTypes = [
        { class: 'star-tiny', count: 30, durationRange: [12, 18] },
        { class: 'star-small', count: 20, durationRange: [15, 22] },
        { class: 'sparkle', count: 15, durationRange: [10, 16] },
        { class: 'glow-orb', count: 8, durationRange: [20, 30] },
        { class: 'shooting-star', count: 3, durationRange: [4, 8] }
    ];
    
    particleTypes.forEach(type => {
        for (let i = 0; i < type.count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${type.class}`;
            
            // Get position avoiding moon area
            const pos = getRandomPosition();
            particle.style.left = `${pos.x}%`;
            particle.style.top = `${pos.y}%`;
            
            particle.style.animationDelay = `${Math.random() * 15}s`;
            const duration = type.durationRange[0] + Math.random() * (type.durationRange[1] - type.durationRange[0]);
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first
    initTheme();
    
    // Create particles (only if not nature theme)
    if (!document.body.classList.contains('nature-theme')) {
        createParticles();
    }
    
    // Add stagger animation to skill items
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation to project cards
    document.querySelectorAll('.project-card, .project-card-ui').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});

// ===== Cursor Effect =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    setTimeout(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }, 100);
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .skill-item, .project-card, .project-card-ui, .social-icon-animated').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ===== Preloader =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});


// ===== Mouse Glow Effect on Cards =====
document.querySelectorAll('.skill-item, .project-card, .project-card-ui').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// ===== Animated Social Icons Interactions =====
document.querySelectorAll('.social-icon-animated').forEach((icon) => {
    // Smooth click effect
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation class
        icon.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            icon.style.transform = '';
        }, 200);
    });
});
