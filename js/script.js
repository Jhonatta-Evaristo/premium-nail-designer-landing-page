
// --- 1. Controle de SPA (Single Page Application) ---
const landingView = document.getElementById('landing-view');
const formView = document.getElementById('form-view');

function openForm() {
    // Esconde Landing, Mostra Form
    landingView.classList.remove('active');
    setTimeout(() => {
        landingView.style.display = 'none';
        formView.style.display = 'block';
        // Trigger reflow
        void formView.offsetWidth;
        formView.classList.add('active');
        window.scrollTo(0, 0); // Vai para o topo da página do formulário
    }, 400); // Tempo da transição
}

function closeForm() {
    // Esconde Form, Mostra Landing
    formView.classList.remove('active');
    setTimeout(() => {
        formView.style.display = 'none';
        landingView.style.display = 'block';
        // Trigger reflow
        void landingView.offsetWidth;
        landingView.classList.add('active');
        window.scrollTo(0, 0);
    }, 400);
}


// --- 2. Menu Mobile Toggle ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- 3. Navbar Scroll Effect na Landing ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (landingView.classList.contains('active')) {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm');
            navbar.classList.replace('py-4', 'py-2');
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.classList.replace('py-2', 'py-4');
        }
    }
});

// --- 4. Scroll Animations (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
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
    observer.observe(el);
});

// --- 5. Form Submission Mock ---
const form = document.getElementById('vipForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('span');
const btnLoader = document.getElementById('btnLoader');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne recarregar a página

    // Inicia estado de loading
    btnText.textContent = 'Enviando respostas...';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

    // Simula uma requisição assíncrona
    setTimeout(() => {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-fade-in');

        btnText.textContent = 'Enviar minhas respostas';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');

        window.scrollTo(0, 0);
    }, 1800);
});
// CARROSSEL DE CURSOS

const carousel = document.getElementById("cursoCarousel");
const nextBtn = document.getElementById("nextCurso");
const prevBtn = document.getElementById("prevCurso");

let scrollAmount = 0;

function getCardWidth() {
    const card = carousel.querySelector("div");
    const gap = 32; // gap-8 do tailwind
    return card.offsetWidth + gap;
}

function getMaxScroll() {
    return carousel.scrollWidth - carousel.parentElement.offsetWidth;
}

function updateArrows() {

    const maxScroll = getMaxScroll();

    if (scrollAmount <= 0) {
        prevBtn.classList.add("hidden");
    } else {
        prevBtn.classList.remove("hidden");
    }

    if (scrollAmount >= maxScroll) {
        nextBtn.classList.add("hidden");
    } else {
        nextBtn.classList.remove("hidden");
    }
}

nextBtn.addEventListener("click", () => {

    scrollAmount += getCardWidth();

    const maxScroll = getMaxScroll();

    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }

    carousel.style.transform = `translateX(-${scrollAmount}px)`;

    updateArrows();
});

prevBtn.addEventListener("click", () => {

    scrollAmount -= getCardWidth();

    if (scrollAmount < 0) {
        scrollAmount = 0;
    }

    carousel.style.transform = `translateX(-${scrollAmount}px)`;

    updateArrows();
});

updateArrows();
