// Menu mobile
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        mobileToggle.innerHTML = '✕';
    } else {
        mobileToggle.innerHTML = '☰';
    }
});

// Slider de depoimentos
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    currentSlide = index;
}

// Inicializar o slider
showSlide(0);

// Adicionar eventos aos dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-index'));
        showSlide(slideIndex);
    });
});

// Alternar slides automaticamente
setInterval(() => {
    const nextSlide = (currentSlide + 1) % testimonials.length;
    showSlide(nextSlide);
}, 5000);

// Mostrar popup após 3 segundos
setTimeout(() => {
    const popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.classList.add('active');
}, 3000);

// Fechar popup
const popupClose = document.querySelector('.popup-close');
const popupOverlay = document.querySelector('.popup-overlay');

popupClose.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
});

// Fechar popup clicando fora
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('active');
    }
});

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        // Fechar menu mobile se estiver aberto
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.innerHTML = '☰';
        }
    });
});

// Efeito de header fixo ao scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
    }
});

// Formulário de newsletter
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;

        if (email) {
            alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
            form.reset();

            // Fechar popup se for o formulário do popup
            if (form.closest('.popup')) {
                popupOverlay.classList.remove('active');
            }
        }
    });
});