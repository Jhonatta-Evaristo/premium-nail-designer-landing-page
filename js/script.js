// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. Controle de SPA ---
const landingView = document.getElementById('landing-view');
const formView = document.getElementById('form-view');

function openForm() {
    landingView.classList.remove('active');
    setTimeout(() => {
        landingView.style.display = 'none';
        formView.style.display = 'block';
        void formView.offsetWidth;
        formView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 500);
}

function closeForm() {
    formView.classList.remove('active');
    setTimeout(() => {
        formView.style.display = 'none';
        landingView.style.display = 'block';
        void landingView.offsetWidth;
        landingView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 500);
}

// --- 2. GSAP Animations (Apple/Nike Style) ---

// Check for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    // 1. Hero Entrance Timeline
    const tlHero = gsap.timeline();

    tlHero.to('.hero-badge', { y: 0, duration: 0.8, ease: "power4.out" })
          .to('.hero-text-line', { y: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, "-=0.6")
          .to('.hero-image', { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.8")
          .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=1")
          .to('.hero-badge-float', { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");

    // 2. Parallax Orbs
    gsap.to('.orb-bg', {
        y: (i, target) => i === 0 ? 100 : -100,
        scrollTrigger: {
            trigger: '#inicio',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 3. Sobre a Dani - Sticky Image Pinning
    ScrollTrigger.create({
        trigger: "#sobre-image-pin",
        start: "top 120px",
        endTrigger: "#sobre-container",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        responsive: {
            768: { pin: false } // Disable pinning on mobile
        }
    });

    // 4. Sobre a Dani - Text Revel
    gsap.to('.sobre-title', {
        y: 0,
        scrollTrigger: {
            trigger: '.sobre-title',
            start: "top 90%"
        }
    });

    gsap.to('.sobre-paragraphs p, .sobre-stats', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.sobre-paragraphs',
            start: "top 85%"
        }
    });

    // 5. Cursos - Entrance
    gsap.to('.cursos-header, .curso-card', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#cursos',
            start: "top 80%"
        }
    });

    // 6. Benefícios - Scroll Scrubbing
    gsap.to('.beneficio-card', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#beneficios',
            start: "top 75%",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // 7. Final CTA
    gsap.to('.final-cta-content', {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.final-cta-section',
            start: "top 70%"
        }
    });

    // 8. 3D Tilt Effect
    document.querySelectorAll('.3d-tilt-container').forEach(container => {
        const img = container.querySelector('.3d-tilt-img');
        const bg = container.querySelector('.3d-tilt-bg');

        container.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(img, {
                rotateY: x * 15,
                rotateX: -y * 15,
                x: x * 10,
                y: y * 10,
                duration: 0.5,
                ease: "power2.out"
            });

            if (bg) {
                gsap.to(bg, {
                    rotateY: x * 5,
                    rotateX: -y * 5,
                    x: -x * 5,
                    y: -y * 5,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });

        container.addEventListener('mouseleave', () => {
            gsap.to([img, bg], {
                rotateY: 0,
                rotateX: 0,
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
} else {
    // Show all elements if reduced motion is enabled
    gsap.set('.hero-badge, .hero-text-line, .hero-buttons, .hero-image, .hero-badge-float, .sobre-title, .sobre-paragraphs p, .sobre-stats, .cursos-header, .curso-card, .beneficio-card, .final-cta-content', {
        opacity: 1,
        y: 0,
        scale: 1
    });
}

// --- 3. Menu Mobile Toggle ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        toggleMenu();
    }
});

// --- 4. Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (landingView.classList.contains('active')) {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm', 'bg-white/95');
            navbar.classList.replace('py-4', 'py-2');
        } else {
            navbar.classList.remove('shadow-sm', 'bg-white/95');
            navbar.classList.replace('py-2', 'py-4');
        }
    }
});

// --- 5. Form Submission ---
const form = document.getElementById('vipForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('span');
const btnLoader = document.getElementById('btnLoader');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    btnText.textContent = 'Enviando...';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;

    setTimeout(() => {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
});

// --- 6. Carrossel de Cursos ---
const carouselContainer = document.querySelector('.overflow-x-auto');
const carousel = document.getElementById('cursoCarousel');
const nextBtn = document.getElementById('nextCurso');
const prevBtn = document.getElementById('prevCurso');

function getCardWidth() {
    const card = carousel.querySelector('div');
    if (!card) return 0;
    return card.offsetWidth + 32;
}

function updateArrows() {
    const isDesktop = window.innerWidth >= 768;
    const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    const currentScroll = carouselContainer.scrollLeft;
    
    prevBtn.style.display = (!isDesktop || currentScroll <= 5) ? 'none' : 'flex';
    nextBtn.style.display = (!isDesktop || currentScroll >= maxScroll - 5) ? 'none' : 'flex';
}

nextBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
});

carouselContainer.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
updateArrows();