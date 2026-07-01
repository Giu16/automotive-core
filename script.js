// ===================================
// Mobile Menu Toggle
// ===================================
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (nav) nav.classList.remove('active');
    });
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (!header) return;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ Accordion - Blindado via JS
// ===================================
// FAQ Accordion - Versão Delegada (Sênior)
const faqContainer = document.querySelector('.faq-container'); // Substitui pela classe do teu container pai

if (faqContainer) {
    faqContainer.addEventListener('click', (e) => {
        // Verifica se clicou num elemento que é uma pergunta
        const question = e.target.closest('.faq-question');
        if (!question) return;

        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Fecha todos os outros itens
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            const a = i.querySelector('.faq-answer');
            if (a) a.style.display = 'none';
        });

        // Abre o item clicado se não estava aberto
        if (!isActive) {
            item.classList.add('active');
            if (answer) answer.style.display = 'block';
        }
    });
}
// ===================================
// Animate Elements on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll(
    '.service-card, .highlight-card, .benefit-item, .testimonials-container, .gallery-item, .contact-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


// ===================================
// Gallery Image Click (Lightbox Effect)
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt || ''}">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        if (!document.getElementById('lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'lightbox-styles';
            style.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .lightbox-content { position: relative; max-width: 90%; max-height: 90%; }
                .lightbox-content img { max-width: 100%; max-height: 90vh; border-radius: 10px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); }
                .lightbox-close { position: absolute; top: -40px; right: 0; font-size: 40px; color: white; cursor: pointer; transition: all 0.3s ease; }
                .lightbox-close:hover { transform: scale(1.2); color: #dc2626; }
            `;
            document.head.appendChild(style);
        }

        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Testimonials Infinite Carousel (Safari Proof)
// ===================================
const track = document.querySelector('.carousel-track');
const originalSlides = Array.from(document.querySelectorAll('.review-card'));
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dotsContainer = document.querySelector('.carousel-dots');

if (track && originalSlides.length > 0 && dotsContainer) {
    // 1. FORÇANDO COMPORTAMENTO NATIVO
    track.style.display = 'flex';
    track.style.overflowX = 'auto';
    track.style.scrollSnapType = 'x mandatory';
    track.style.scrollBehavior = 'smooth';
    track.style.scrollbarWidth = 'none';
    track.style.webkitOverflowScrolling = 'touch';

    // Injeta CSS para esconder scrollbar
    if (!document.getElementById('carousel-hide-scroll')) {
        const style = document.createElement('style');
        style.id = 'carousel-hide-scroll';
        style.textContent = `.carousel-track::-webkit-scrollbar { display: none !important; }`;
        document.head.appendChild(style);
    }

    // 2. CLONAGEM PARA LOOP INFINITO
    // Clonamos o primeiro slide e adicionamos ao final
    const firstClone = originalSlides[0].cloneNode(true);
    track.appendChild(firstClone);
    
    // Atualiza lista com o clone incluso
    const allSlides = Array.from(document.querySelectorAll('.review-card'));

    dotsContainer.innerHTML = '';
    originalSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

    allSlides.forEach((slide) => {
        slide.style.scrollSnapAlign = 'center';
        slide.style.flexShrink = '0';
    });

    // 3. LÓGICA DE NAVEGAÇÃO
    const getSlideWidth = () => {
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        return originalSlides[0].offsetWidth + gap;
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (track.scrollLeft >= (allSlides.length - 1) * getSlideWidth()) {
                track.scrollLeft = 0; // Se estiver no fim, volta ao início
            } else {
                track.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            track.scrollTo({ left: index * getSlideWidth(), behavior: 'smooth' });
        });
    });

    // 4. OBSERVER BLINDADO PARA LOOP INFINITO
    const observerOptions = { root: track, threshold: 0.8 }; // Aumentei o threshold para 0.8 para ser mais preciso
    let isResetting = false; // Flag para travar execuções múltiplas

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isResetting) {
                const index = allSlides.indexOf(entry.target);
                
                // Se chegou no clone (o último slide extra)
                if (index === allSlides.length - 1) {
                    isResetting = true; // Trava o observador
                    
                    // Reset instantâneo (behavior: 'auto')
                    track.scrollTo({ left: 0, behavior: 'auto' });
                    
                    // Reseta a flag após um curto período para permitir novos movimentos
                    setTimeout(() => { isResetting = false; }, 500);
                    
                    // Força a bolinha 1 ficar ativa
                    dots.forEach(d => d.classList.remove('active'));
                    dots[0].classList.add('active');
                } else {
                    // Atualiza bolinhas normalmente
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                }
            }
        });
    }, observerOptions);

    allSlides.forEach(slide => observer.observe(slide));
}

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('Zyron Auto - Landing Page Loaded Successfully');
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ===================================
// Prevent Gallery Overlay Click Propagation
// ===================================
document.querySelectorAll('.gallery-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});