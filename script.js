// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.getElementById('scrollTop');
const statNumbers = document.querySelectorAll('.stat-number');
const navLinkItems = document.querySelectorAll('.nav-link');

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

// ===== Create Floating Particles & Bubbles =====
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Particle size configurations
    const sizes = [
        { class: 'small', count: 25, durationRange: [15, 20] },
        { class: 'medium', count: 15, durationRange: [18, 25] },
        { class: 'large', count: 10, durationRange: [22, 30] },
        { class: 'xlarge', count: 5, durationRange: [25, 35] }
    ];
    
    sizes.forEach(size => {
        for (let i = 0; i < size.count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${size.class}`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            const duration = size.durationRange[0] + Math.random() * (size.durationRange[1] - size.durationRange[0]);
            particle.style.animationDuration = `${duration}s`;
            
            // Add wobble animation for larger bubbles
            if (size.class === 'large' || size.class === 'xlarge') {
                particle.style.animationName = 'bubbleWobble';
            }
            
            particlesContainer.appendChild(particle);
        }
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
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
