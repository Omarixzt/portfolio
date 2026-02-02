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
        description: "A comprehensive system for mobile shops including sales tracking, inventory management, and device maintenance logging.",
        techStack: ["Desktop","Flutter", "Dart", "SQL"],
        videoSrc: "assets/pos-demo.mp4", 
        gradientClass: "gradient-1"
    },
    {
        title: "POS Analytics Dashboard",
        description: "A serverless web tool built with Flutter that parses raw SQLite database files directly in the browser using WebAssembly.",
        techStack: ["Mobile", "Flutter Web", "SQLite WASM"],
        videoSrc: null,
        gradientClass: "gradient-2"
    },
    {
        title: "SaaS Product Landing Page",
        description: "A high-performance landing page designed for a tech startup. Built with a mobile-first approach and smooth animations.",
        techStack: ["Web", "HTML5", "CSS3", "SEO"],
        videoSrc: null,
        gradientClass: "gradient-3"
    }
];

/**
 * 2. Render Projects & Media Logic
 */
const renderProjects = () => {
    const container = document.getElementById('projects-container');
    if(!container) return;
    
    container.innerHTML = ''; 

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        const techStackHTML = project.techStack
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');

        let mediaContent = project.videoSrc 
            ? `<video class="project-video" muted playsinline preload="metadata"><source src="${project.videoSrc}" type="video/mp4"></video>`
            : `<i data-lucide="folder-code"></i>`;

        let imgContainerClass = project.videoSrc ? "project-img has-video" : `project-img ${project.gradientClass}`;

        card.innerHTML = `
            <div class="${imgContainerClass}">${mediaContent}</div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">${techStackHTML}</div>
            </div>
        `;

        // Desktop Hover & Mobile Intersection Logic
        if (project.videoSrc) {
            const video = card.querySelector('video');

            // Desktop Hover
            card.addEventListener('mouseenter', () => {
                if(window.innerWidth >= 768) {
                    video.play().catch(e => console.log("Play interrupted")); 
                }
            });

            card.addEventListener('mouseleave', () => {
                if(window.innerWidth >= 768) {
                    video.pause();
                    video.currentTime = 0;
                }
            });

            // Mobile Auto-play on View
            const mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (window.innerWidth < 768) {
                        if (entry.isIntersecting) {
                            video.play().catch(e => {});
                        } else {
                            video.pause();
                        }
                    }
                });
            }, { threshold: 0.6 });

            mobileObserver.observe(card);
        }

        container.appendChild(card);
    });

    if(window.lucide) lucide.createIcons();
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
        strings: ["Software Engineer", "Full Stack Developer", "System Analyst"],
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
    
    // Performance improvement: Debounce resize event
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
        
        btn.innerText = "جاري الإرسال...";
        btn.disabled = true;

        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                btn.innerText = "تم الإرسال بنجاح! ✅";
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            btn.innerText = "فشل الإرسال ❌";
        }
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        }, 3000);
    });
};

/**
 * 6. Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initTyped(); 
    initMagneticButtons();
    initBackground();
    initSectionHeaders();
    initScrollSpy();
    initBackToTop();
    initContactForm(); // Initialize AJAX Form

    setTimeout(() => {
        initGSAP();
        ScrollTrigger.refresh();
    }, 100);
    
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const totalScroll = document.body.scrollHeight - window.innerHeight;
        let progress = (window.scrollY / totalScroll);
        progress = Math.min(Math.max(progress, 0), 1);
        document.documentElement.style.setProperty('--scroll-per', `${progress * 100}%`);
    });
});