// --- 1. Controle de SPA (Single Page Application) ---
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
    }, 500); // match CSS transition duration
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

// --- 2. Menu Mobile Toggle ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // lock scroll
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

// Close menu on click outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        toggleMenu();
    }
});

// --- 3. Navbar Scroll Effect na Landing ---
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

// --- 4. Scroll Animations (Intersection Observer) ---
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => {
    if (prefersReducedMotion.matches) {
        el.classList.add('active'); // show immediately
    } else {
        observer.observe(el);
    }
});

// --- 5. Form Submission Mock ---
const form = document.getElementById('vipForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('span');
const btnLoader = document.getElementById('btnLoader');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    btnText.textContent = 'Enviando respostas...';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

    // Announce to screen readers
    btnLoader.setAttribute('aria-live', 'assertive');

    setTimeout(() => {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-fade-in');
        btnText.textContent = 'Enviar minhas respostas';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
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
    const gap = 32; // gap-8
    return card.offsetWidth + gap;
}

function updateArrows() {
    const isDesktop = window.innerWidth >= 768;
    const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    const currentScroll = carouselContainer.scrollLeft;
    
    // threshold of 5px for floating point rounding
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