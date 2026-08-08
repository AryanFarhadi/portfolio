/* ==========================================================================
   Aryan Farhadi - Lead XR & Unity Engineer Portfolio Core JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initParticleCanvas();
    initDynamicTyping();
    initProjectFiltering();
    initDemoTabs();
    initXRSimulators();
    initContactForm();
    initNavbarScroll();
    initMobileNav();
});

/* --------------------------------------------------------------------------
   1. Mouse Cursor Glow Tracking
   -------------------------------------------------------------------------- */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

/* --------------------------------------------------------------------------
   2. Background Particle Canvas Effect
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 70);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let angle = Math.atan2(dy, dx);
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.6;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#8b5cf6';
                    ctx.globalAlpha = (1 - dist / 120) * 0.15;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   3. Dynamic Typing Effect for Hero Title
   -------------------------------------------------------------------------- */
function initDynamicTyping() {
    const roleElem = document.getElementById('dynamicRole');
    if (!roleElem) return;

    const roles = [
        "Industrial Digital Twins",
        "Multiplayer VR SDKs",
        "Standalone Quest 72 FPS",
        "Enterprise AR Passthrough"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            roleElem.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            roleElem.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* --------------------------------------------------------------------------
   4. Project Filter Tabs
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Demos Tab Switcher
   -------------------------------------------------------------------------- */
function initDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    const demoBtns = document.querySelectorAll('.open-project-demo');
    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const demoType = btn.dataset.demo;
            const targetTab = document.querySelector(`.demo-tab[data-tab="tab-${demoType}"]`);
            if (targetTab) {
                targetTab.click();
                document.getElementById('demos').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. Interactive XR Simulators
   -------------------------------------------------------------------------- */
function initXRSimulators() {
    // XRoom Network Sync Simulator
    const roomPreset = document.getElementById('roomPreset');
    const userCountDisplay = document.getElementById('userCountDisplay');
    const simulatePacketBtn = document.getElementById('simulatePacketBtn');
    const networkStreamLog = document.getElementById('networkStreamLog');

    if (roomPreset && userCountDisplay) {
        roomPreset.addEventListener('change', () => {
            if (roomPreset.value === 'room1') {
                userCountDisplay.textContent = '18 / 20 Meta Quest Standalone';
            } else if (roomPreset.value === 'room2') {
                userCountDisplay.textContent = '12 / 20 Meta Quest & PC VR';
            } else {
                userCountDisplay.textContent = '20 / 20 Meta Quest (MAX CAPABILITY REACHED)';
            }
        });
    }

    if (simulatePacketBtn && networkStreamLog) {
        simulatePacketBtn.addEventListener('click', () => {
            const now = new Date().toLocaleTimeString();
            const randomUser = Math.floor(Math.random() * 20) + 1;
            const randomLatency = Math.floor(Math.random() * 10) + 30; // 30-40ms
            
            const logLine = `[${now}] [XRoomNet] BroadcastSpatialTransform(User #${randomUser}) -> Delta compressed | Latency: ${randomLatency}ms (UDP OK)`;
            networkStreamLog.innerHTML = `${logLine}<br>${networkStreamLog.innerHTML}`;
        });
    }

    // Mobarakeh Steel Crane Simulator
    const triggerHazardBtn = document.getElementById('triggerHazardBtn');
    const craneTableBody = document.getElementById('craneTableBody');
    const safetyScore = document.getElementById('safetyScore');

    if (triggerHazardBtn && craneTableBody) {
        triggerHazardBtn.addEventListener('click', () => {
            alert('Simulated Hazardous Incident Triggered! Crane Emergency Stop Engaged. Operator Avoided Accident-Risk Incident in VR.');
            if (safetyScore) safetyScore.textContent = '100% (PERFECT HAZARD AVOIDANCE)';
        });
    }
}

/* --------------------------------------------------------------------------
   7. Contact Form & Copy Email
   -------------------------------------------------------------------------- */
function initContactForm() {
    const copyEmailCard = document.getElementById('copyEmailCard');
    const emailValue = document.getElementById('emailValue');

    if (copyEmailCard && emailValue) {
        copyEmailCard.addEventListener('click', () => {
            navigator.clipboard.writeText(emailValue.textContent).then(() => {
                const origText = emailValue.textContent;
                emailValue.textContent = "Copied to clipboard!";
                emailValue.style.color = "#34d399";
                setTimeout(() => {
                    emailValue.textContent = origText;
                    emailValue.style.color = "var(--text-primary)";
                }, 2000);
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<i data-lucide="check-circle-2"></i> Thank you! Message sent to Aryan Farhadi.`;
            lucide.createIcons();
            contactForm.reset();
        });
    }

    const openContactModal = document.getElementById('openContactModal');
    if (openContactModal) {
        openContactModal.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/* --------------------------------------------------------------------------
   8. Navbar Scroll Effects
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   9. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}
