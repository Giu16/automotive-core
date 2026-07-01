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
// Testimonials Google-Style Carousel
// ===================================
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.review-card'));
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dotsContainer = document.querySelector('.carousel-dots');
 
if (track && slides.length > 0 && dotsContainer) {
    let currentIndex = 0;
    let slideWidth = 0;
    let maxIndex = 0;
 
    // 1. Renderiza os dots dinamicamente
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
 
    // 2. Função PURA para medir. Isolada da animação para evitar Reflow no Safari!
    const measureSlideWidth = () => {
        if (!slides[0]) return;
        const trackStyles = window.getComputedStyle(track);
        const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
        slideWidth = slides[0].getBoundingClientRect().width + gap;
        
        // Calcula o limite máximo real considerando quantos cards cabem na tela
        const containerWidth = track.parentElement.getBoundingClientRect().width;
        const cardsPerView = Math.round(containerWidth / slideWidth) || 1;
        maxIndex = Math.max(slides.length - cardsPerView, 0);
    };
 
    // 3. Atualiza o slider centralizando a lógica (Swipe, Clique e Dots usam a mesma base)
    const updateSlider = (index) => {
        // Lógica de loop contínuo
        if (index > maxIndex) index = 0;
        if (index < 0) index = maxIndex;
 
        track.style.transform = `translateX(-${index * slideWidth}px)`;
 
        // Atualiza bolinhas
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
 
        currentIndex = index;
    };
 
    // Inicialização
    measureSlideWidth();
    
    // Reforço para carregamento de fontes customizadas
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            measureSlideWidth();
            updateSlider(currentIndex);
        });
    }
 
    // Recalcula apenas quando a tela mudar de tamanho (com debounce para não travar)
    window.addEventListener('resize', () => {
        window.requestAnimationFrame(() => {
            measureSlideWidth();
            updateSlider(currentIndex);
        });
    });
 
    // 4. Controles de Botões e Dots
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => updateSlider(index)));
 
    // 5. O SEGREDO DO SAFARI (Touch Events)
    // touch-action: pan-y diz ao WebKit: "Deixe o usuário rolar para baixo, 
    // mas eu (Javascript) cuido dos arrastes horizontais". Evita o touchcancel.
    track.style.touchAction = 'pan-y';
 
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCurrentX = 0;
    let isSwiping = false;
    let swipeDirectionDecided = false;
    let isHorizontalSwipe = false;
 
    track.addEventListener('touchstart', (e) => {
        // Removida a gambiarra do transition: 'none'. Deixe o CSS fluir.
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchCurrentX = touchStartX;
        isSwiping = true;
        swipeDirectionDecided = false;
        isHorizontalSwipe = false;
    }, { passive: true });
 
    track.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
 
        touchCurrentX = e.touches[0].clientX;
        const diffX = touchCurrentX - touchStartX;
        const diffY = e.touches[0].clientY - touchStartY;
 
        // Trava a decisão da direção no primeiro milissegundo do toque
        if (!swipeDirectionDecided) {
            if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
                swipeDirectionDecided = true;
            }
        }
 
        // Se for lateral, impede a tela de "dançar" (scroll)
        if (isHorizontalSwipe && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
 
    const handleSwipeEnd = () => {
        if (!isSwiping || !isHorizontalSwipe) {
            isSwiping = false;
            return;
        }
 
        const swipeDistance = touchStartX - touchCurrentX;
        const minSwipeDistance = 40; // Sensibilidade
 
        if (swipeDistance > minSwipeDistance) {
            updateSlider(currentIndex + 1); // Deslizou pra esquerda (Próximo)
        } else if (swipeDistance < -minSwipeDistance) {
            updateSlider(currentIndex - 1); // Deslizou pra direita (Anterior)
        }
 
        isSwiping = false;
    };
 
    // Dispara a finalização tanto no end quanto no cancel (proteção nativa do iOS)
    track.addEventListener('touchend', handleSwipeEnd);
    track.addEventListener('touchcancel', () => { isSwiping = false; });
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