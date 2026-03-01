/**
 * GSAP & Plugins Registration
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * 1. Project Data
 */
const projects = [
    {
        title: "Mobile Shop Management",
        description: "A high-performance enterprise solution for mobile retailers. Features real-time inventory control, automated sales analytics, and a comprehensive hardware maintenance module. Includes smart expense tracking, commission management, and an automated cloud backup system via Telegram.",
        techStack: ["Desktop","Flutter", "Dart", "SQLite"],
        imageSrc: "assets/pos_overview.jpg", 
        gradientClass: "gradient-1"
    },
    {
        title: "Samsung Smart TV Movie Browser (Tizen OS)",
        description: "A specialized web application optimized for Tizen OS, featuring remote control navigation mapping and advanced ad-blocking logic for a seamless viewing experience.",
        techStack: ["Tizen OS", "Vanilla JS", "TV APIs"],
        imageSrc: "assets/TvBrowser_overview.jpg",
        gradientClass: "gradient-2"
    },
    {
        title: "SaaS Product Landing Page",
        description: "A high-performance landing page designed for a tech startup. Built with a mobile-first approach and smooth animations.",
        techStack: ["Web", "HTML5", "CSS3", "SEO"],
        imageSrc: "assets/comingsoon.jpg",
        gradientClass: "gradient-3"
    }
];

/**
 * 2. Render Projects & Media Logic
 */
const renderProjects = () => {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        const techStackHTML = project.techStack
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');

        let mediaContent = "";
        if (project.videoSrc) {
            mediaContent = `<video class="project-video" muted playsinline preload="metadata"><source src="${project.videoSrc}" type="video/mp4"></video>`;
        } else if (project.imageSrc) {
            mediaContent = `<img src="${project.imageSrc}" alt="${project.title}" class="project-img-content">`;
        } else {
            mediaContent = `<img src="assets/comingsoon.jpg" alt="Coming Soon" class="project-img-content">`;
        }

        const imgContainerClass = "project-img";

        card.innerHTML = `
            <div class="${imgContainerClass}">${mediaContent}</div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">${techStackHTML}</div>
            </div>
        `;

        if (project.videoSrc) {
            const video = card.querySelector('video');

            card.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 768) video.play().catch(() => {});
            });

            card.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 768) {
                    video.pause();
                    video.currentTime = 0;
                }
            });

            const mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (window.innerWidth < 768) {
                        entry.isIntersecting ? video.play().catch(() => {}) : video.pause();
                    }
                });
            }, { threshold: 0.6 });

            mobileObserver.observe(card);
        }

        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
    ScrollTrigger.refresh();
};

/**
 * 3. GSAP Animations
 */
const initGSAP = () => {
    gsap.set(".hero-content h1, .hero-content p, .hero-socials a, .hero .btn", { autoAlpha: 0 });

    const tl = gsap.timeline();

    tl.to(".hero-content h1", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(".hero-content p", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6") 
      .to(".hero-socials a", { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.6")
      .fromTo(".hero .btn", 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", clearProps: "all" }, 
        "-=0.4"
    );

    gsap.utils.toArray('section').forEach(section => {
        if(section.id !== 'home') { 
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

    const cards = document.querySelectorAll(".project-card");
    if(cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: { trigger: "#projects", start: "top 80%" },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.2, 
            ease: "power2.out",
            clearProps: "opacity, transform"
        });
    }
    
    gsap.from(".skill-tag", {
        scrollTrigger: { trigger: "#skills", start: "top 85%" },
        scale: 0.5,
        opacity: 0,
        stagger: { amount: 0.5, grid: "auto", from: "center" },
        duration: 0.5,
        ease: "back.out(2)"
    });
};

/**
 * 4. UI Effects & Features
 */
const initSectionHeaders = () => {
    const headers = document.querySelectorAll('.section-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.5 });

    headers.forEach(header => observer.observe(header));
};

const initTyped = () => {
    const element = document.querySelector('.typing-text');
    if(!element) return;

    new Typed('.typing-text', {
        strings: ["Software Engineer", "Full Stack Developer", "Mobile App Developer"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });
};

const initMagneticButtons = () => {
    const magnets = [
        { selector: '.hero-socials a', strength: 0.3 },
        { selector: '.skill-tag', strength: 0.2 },
        { selector: '.hero .btn', strength: 0.3 },
        { selector: '.nav-links a', strength: 0.1 },
        { selector: '.logo', strength: 0.1 } 
    ];

    magnets.forEach((item) => {
        document.querySelectorAll(item.selector).forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const position = el.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                gsap.to(el, { x: x * item.strength, y: y * item.strength, duration: 0.3, ease: "power2.out" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            });
        });
    });
};

/**
 * 5. Background & Utilities
 */
const initBackground = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            initParticles();
        }, 200);
    });

    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5; 
            this.speedY = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.2 + 0.05; 
            this.color = `rgba(139, 92, 246, ${this.opacity})`; 
        }
        update() {
            this.y -= this.speedY; 
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];
        const count = window.innerWidth < 768 ? 50 : 100;
        for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    initParticles();

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };
    animate();
};

const initScrollSpy = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });
};

const initBackToTop = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        window.scrollY > 500 ? btn.classList.add('visible') : btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        btn.disabled = true;

        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                btn.innerText = "Success! ✅";
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            btn.innerText = "Failed ❌";
        }
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        }, 3000);
    });
};

/**
 * 6. Lightbox & Image Protection
 */
const initImageFeatures = () => {
    // Prevent Right Click and Dragging on all images
    document.addEventListener('contextmenu', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

    // Create Lightbox DOM
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Enlarged Project">
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('lightbox-img');

    // Open Lightbox on image click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-img-content') && e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            setTimeout(() => modal.classList.add('show'), 10);
        }
    });

    // Close Lightbox
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    modal.addEventListener('click', closeModal);
};

/**
 * 7. Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initTyped(); 
    initMagneticButtons();
    initBackground();
    initSectionHeaders();
    initScrollSpy();
    initBackToTop();
    initContactForm(); 
    initImageFeatures();

    setTimeout(() => {
        initGSAP();
        ScrollTrigger.refresh();
    }, 100);
    
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    window.addEventListener('scroll', () => {
        const totalScroll = document.body.scrollHeight - window.innerHeight;
        let progress = (window.scrollY / totalScroll);
        progress = Math.min(Math.max(progress, 0), 1);
        document.documentElement.style.setProperty('--scroll-per', `${progress * 100}%`);
    });
});