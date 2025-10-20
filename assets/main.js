// --- FUNÇÃO MÁQUINA DE ESCREVER (DESTAQUE EM TEMPO REAL) ---
function startTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    // 1. DEFINIÇÃO DO TEXTO E POSIÇÕES
    const fullText = "Transform Data Overload into Actionable Intelligence.";
    const highlightTarget = "Actionable Intelligence.";

    // Calcula a posição de início
    const highlightStart = fullText.indexOf(highlightTarget); 

    const typingSpeed = 50; 
    let index = 0;

    // Garante que o texto comece vazio
    textElement.textContent = ''; 

    function type() {
        if (index < fullText.length) {

            let currentContent = '';

            // 1. Lógica para texto antes e durante o destaque
            if (index < highlightStart) {
                // Digita o texto normal
                currentContent = fullText.substring(0, index + 1);
            } else {
                // Se o índice alcançou ou ultrapassou o ponto de destaque:

                // Pega a parte normal (que não é destaque)
                let normalPart = fullText.substring(0, highlightStart);

                // Pega a parte que será digitada DENTRO do destaque Ciano
                let highlightedPart = fullText.substring(highlightStart, index + 1);

                // Constrói o HTML: Parte Normal + <span Ciano> + Parte Ciano Digitada + Cursor
                currentContent = normalPart + '<span class="highlight">' + highlightedPart + '</span>';
            }

            // 2. ATUALIZA O CONTEÚDO (CRÍTICO: Usa innerHTML)
            textElement.innerHTML = currentContent;

            index++;
            setTimeout(type, typingSpeed);

        } else {
            // PÓS-DIGITAÇÃO: Garante que o HTML finalize e remove o cursor

            let finalHTML = fullText.replace(highlightTarget, '<span class="highlight">' + highlightTarget + '</span>');
            textElement.innerHTML = finalHTML;

            textElement.classList.remove('typing-effect');
        }
    }

    // Inicia o processo
    type();
}

// -------------------------------------------------------------
// --- FUNÇÃO GLOBAL: HIDE PRELOADER (Corrigida) ---
// -------------------------------------------------------------
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Inicia o fade out
        preloader.style.opacity = '0';
        
        // Remove o elemento do DOM após o fim da transição (500ms)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); 
    }
}

// -------------------------------------------------------------
// --- MAIN LOGIC ---
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {

    // --- 0. FUNÇÃO: NAVBAR ANIMATION (Descida Suave) ---
    const header = document.querySelector('.header');
    
    if (header) {
        // Pequeno delay para dar tempo da página carregar
        setTimeout(() => {
            header.classList.add('visible');
        }, 300); // 300ms de delay para suavidade

        // Sticky on scroll: ativa após sair do topo do hero com threshold leve
        const stickyThreshold = 30; // px
        let lastIsSticky = false;
        const onScroll = () => {
            const isSticky = window.scrollY > stickyThreshold;
            if (isSticky !== lastIsSticky) {
                header.classList.toggle('sticky', isSticky);
                lastIsSticky = isSticky;
            }
        };
        // Respeita reduced motion? Apenas controla estado sem animações extras (CSS já trata)
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // --- 1. FUNÇÃO: PROGRESSIVE LOADING ---
    const elementsToAnimate = document.querySelectorAll('.hidden-element');

    // Define um atraso de 800 milissegundos (0.8s) para dar foco ao Hero
    // (Esta função agora lida APENAS com o conteúdo, o preloader é escondido no 'window.onload')
    setTimeout(() => {
        elementsToAnimate.forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.1}s`; 

            // 💥 CORREÇÃO CRÍTICA: Forçar o Recálculo do CSS (Flushing) 💥
            void element.offsetWidth; 

            // 2. Remove a classe para iniciar a transição suave
            element.classList.remove('hidden-element');
            element.classList.add('visible-element');
        });
    }, 800); 

    // --- 2. FUNÇÃO: MÁQUINA DE ESCREVER (Typing Effect) ---
    startTypingEffect();

    // --- 3. FUNÇÃO: FORM VALIDATION ---
    const heroForm = document.getElementById('hero-form');
    const emailInput = document.getElementById('hero-email');
    const errorMessage = document.getElementById('email-error');

    if (heroForm && emailInput && errorMessage) {
        // Real-time validation
        emailInput.addEventListener('input', function() {
            validateEmail();
        });

        // Form submission
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateEmail()) {
                // Simulate form submission
                showSuccessMessage();
            }
        });

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                showError('Email is required');
                return false;
            } else if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return false;
            } else {
                hideError();
                return true;
            }
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            emailInput.setAttribute('aria-invalid', 'true');
        }

        function hideError() {
            errorMessage.classList.remove('show');
            emailInput.setAttribute('aria-invalid', 'false');
        }

    function showSuccessMessage() {
    // Remove qualquer mensagem de sucesso anterior
    const existingSuccess = document.querySelector('.global-success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Cria a mensagem de sucesso (Versão Centralizada e com Efeito Pop/Glassmorphism)
    const successDiv = document.createElement('div');
    successDiv.className = 'global-success-message glass-card-contact'; // Reutiliza o estilo Glass Card
    successDiv.setAttribute('role', 'status');
    successDiv.setAttribute('aria-live', 'polite');
    successDiv.setAttribute('tabindex', '-1');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%; /* CORREÇÃO: Centraliza verticalmente na viewport */
        left: 50%;
        
        /* Centraliza e inicia menor para o efeito 'pop' */
        transform: translate(-50%, -50%) scale(0.9); 
        opacity: 0;
        
        /* Estilos do Glass Card e Glow */
        background: rgba(0, 188, 212, 0.1); /* Fundo ciano semi-transparente */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--color-primary-accent); /* Borda ciano sólida */
        box-shadow: 0 0 30px rgba(0, 188, 212, 0.7); /* Glow forte */
        
        color: var(--color-light-text);
        padding: 30px 40px;
        border-radius: 18px;
        text-align: center;
        z-index: 10000;
        font-weight: 600;
        /* Curva de transição personalizada para o efeito 'pop' */
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); 
        min-width: 300px;
        max-width: 90vw;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 12px; font-size: 1.5rem; color: var(--color-primary-accent);"></i>
        <span style="font-size: 1.1rem;">Inquiry Received!</span>
        <p style="margin-top: 10px; font-weight: 400; font-size: 0.95rem;">Thank you, your message has been transmitted to AI-CORE servers. We will be in touch shortly.</p>
    `;

    // ANEXA AO BODY
    document.body.appendChild(successDiv);
    
    // Força o repaint para garantir a transição de 'pop'
    void successDiv.offsetWidth; 

    // ANIMAÇÃO DE ENTRADA (POP)
    successDiv.style.opacity = '1';
    successDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    // Foca a mensagem para leitores de tela
    successDiv.focus({ preventScroll: true });


    // Reset form (limpa campos)
    const emailField = document.getElementById('hero-email');
    if (emailField) {
        emailField.value = '';
    }

    // Função para remover mensagem (com foco de volta)
    const removeSuccess = () => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => { successDiv.remove(); }, 500);
        if (emailInput) {
            emailInput.focus({ preventScroll: true });
        }
    };

    // Fechar com ESC
    successDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            removeSuccess();
        }
    });

    // Remove a mensagem após 6 segundos
    setTimeout(removeSuccess, 6000);
}
    }

    // --- 4. FUNÇÃO: PRICE TOGGLE (MENSAL/ANUAL) ---
    const pricingSwitch = document.getElementById('pricing-switch');
    const prices = document.querySelectorAll('.price');
    const monthlyLabel = document.querySelector('.toggle-label.monthly');
    const annuallyLabel = document.querySelector('.toggle-label.annually');

    if (pricingSwitch) {
        pricingSwitch.addEventListener('change', () => {
            const isChecked = pricingSwitch.checked; // true = Anual, false = Mensal

            prices.forEach(price => {
                if (isChecked) {
                    price.textContent = price.dataset.annually + '/yr';
                } else {
                    price.textContent = price.dataset.monthly + '/mo';
                }
            });

            monthlyLabel.classList.toggle('active', !isChecked);
            annuallyLabel.classList.toggle('active', isChecked);
        });
    }

    // --- 5. FUNÇÃO: FEATURES CAROUSEL INFINITO (Indicadores Corrigidos) ---
    const carouselTrack = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    
    if (carouselTrack && indicators.length > 0) {
        let currentSlide = 0;
        const totalSlides = 12; // Número total de features únicas
        let slideWidth = 345; // será recalculado dinamicamente
        let isHovered = false;
        let isManuallyControlled = false;
        let autoPlayInterval;

        // Recalcula largura do slide com base no primeiro card + gap
        function recalcSlideWidth() {
            const firstCard = carouselTrack.querySelector('.feature-card');
            if (!firstCard) return;
            const cardRect = firstCard.getBoundingClientRect();
            // gap estimado a partir do CSS (pegando computed style) ou fallback
            const styles = window.getComputedStyle(carouselTrack);
            const gap = parseFloat(styles.columnGap || styles.gap || '25');
            slideWidth = Math.round(cardRect.width + gap);
        }
        recalcSlideWidth();
        
        // Função para atualizar indicadores (classe e ARIA)
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                const isActive = index === currentSlide;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        }
        
        // Função para mover o carrossel manualmente
        function moveToSlide(slideIndex) {
            currentSlide = slideIndex;
            const translateX = -(currentSlide * slideWidth);
            
            // Remove animação CSS e usa controle manual
            carouselTrack.classList.add('manual-control');
            carouselTrack.style.transform = `translateX(${translateX}px)`;
            
            updateIndicators();
            
            // Para o auto-play temporariamente
            clearInterval(autoPlayInterval);
            
            // Reinicia auto-play após 8 segundos
            setTimeout(() => {
                if (!isHovered) {
                    startAutoPlay();
                }
            }, 8000);
        }

        // Prev/Next handlers
        function goPrev() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            moveToSlide(currentSlide);
        }
        function goNext() {
            currentSlide = (currentSlide + 1) % totalSlides;
            moveToSlide(currentSlide);
        }
        
        // Função para pausar animação automática
        function pauseAnimation() {
            isHovered = true;
            carouselTrack.style.animationPlayState = 'paused';
            clearInterval(autoPlayInterval);
        }
        
        // Função para reiniciar animação automática
        function resumeAnimation() {
            isHovered = false;
            if (!isManuallyControlled) {
                carouselTrack.style.animationPlayState = 'running';
                startAutoPlay();
            }
        }
        
        // Função para auto-play manual
        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                if (!isHovered && !isManuallyControlled) {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    const translateX = -(currentSlide * slideWidth);
                    carouselTrack.classList.add('manual-control');
                    carouselTrack.style.transform = `translateX(${translateX}px)`;
                    updateIndicators();
                }
            }, 5000); // Muda slide a cada 5 segundos
        }
        
        // Event listeners para hover
        carouselTrack.addEventListener('mouseenter', pauseAnimation);
        carouselTrack.addEventListener('mouseleave', resumeAnimation);

        // Controles Prev/Next (se existirem)
        if (prevBtn) {
            prevBtn.addEventListener('click', goPrev);
            prevBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goPrev(); }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', goNext);
            nextBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); }
            });
        }
        
        // Event listeners para indicadores (mouse e teclado)
        indicators.forEach((indicator, index) => {
            const activate = () => {
                isManuallyControlled = true;
                moveToSlide(index);
                // Permite que o auto-play retome após 15 segundos
                setTimeout(() => { isManuallyControlled = false; }, 15000);
            };
            indicator.addEventListener('click', activate);
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                }
            });
        });
        
        // Inicializa os indicadores
        updateIndicators();
        
        // Inicia o auto-play manual após 3 segundos
        setTimeout(() => {
            if (!isHovered) {
                startAutoPlay();
            }
        }, 3000);
        
        // Adiciona suporte para touch/swipe em dispositivos móveis
        let startX = 0;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            pauseAnimation();
        }, { passive: true });
        
        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });
        
        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Swipe mínimo de 50px
                if (diffX > 0) {
                    // Swipe para esquerda - próximo slide
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    // Swipe para direita - slide anterior
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                moveToSlide(currentSlide);
            }
            
            // Reinicia animação após 3 segundos
            setTimeout(() => {
                if (!isHovered) {
                    resumeAnimation();
                }
            }, 3000);
        }, { passive: true });
        
        // Adiciona suporte para navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goPrev();
            } else if (e.key === 'ArrowRight') {
                goNext();
            }
        });

        // Recalcula em resize e mantém alinhamento
        window.addEventListener('resize', () => {
            const previousWidth = slideWidth;
            recalcSlideWidth();
            if (slideWidth !== previousWidth) {
                // reposiciona o track para o slide atual com a nova largura
                const translateX = -(currentSlide * slideWidth);
                carouselTrack.style.transform = `translateX(${translateX}px)`;
            }
        });
    }

    // --- 6. FUNÇÃO: SMOOTH SCROLL (Navegação Suave) ---
    // Encontra todos os links de navegação interna (que começam com '#') que não são apenas '#'
    document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            const targetId = this.getAttribute('href');
            
            // Ignora links que são apenas '#' (como botões CTA ou de usuário que não têm alvo de rolagem)
            if (targetId.length <= 1) return;
            
            // 1. Previne o comportamento padrão (salto seco)
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 2. Respeita prefers-reduced-motion
                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                targetElement.scrollIntoView({
                    behavior: prefersReduced ? 'auto' : 'smooth',
                    block: 'start' // Alinha o topo da seção ao topo da viewport
                });

                // 3. Atualiza o URL (opcional, para refletir o hash na URL)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // --- 7. FUNÇÃO: FAQ ACCORDION (Toggle Expand/Collapse) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Fecha todos os outros itens (opcional: comente para permitir múltiplos abertos)
            document.querySelectorAll('.faq-item').forEach((item) => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle do item clicado
            if (isActive) {
                faqItem.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Suporte a teclado (Enter e Space)
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // --- 8. FUNÇÃO: DARK/LIGHT MODE TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verifica se há preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Atualiza o ícone
            const isLight = body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            
            // Salva preferência
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Toast de confirmação
            showToast('Theme Updated', `Switched to ${isLight ? 'light' : 'dark'} mode`, 'success');
        });
    }

    // --- 8.5. FUNÇÃO: MOBILE MENU TOGGLE ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            
            // Previne scroll do body quando menu aberto
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Fecha menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Fecha menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                mobileMenuToggle.focus();
            }
        });
    }

    // --- 9. FUNÇÃO: BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Mostra/esconde botão baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll suave ao topo
        backToTopBtn.addEventListener('click', () => {
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
                top: 0,
                behavior: prefersReduced ? 'auto' : 'smooth'
            });
        });
    }

    // --- 10. FUNÇÃO: TOAST NOTIFICATIONS ---
    window.showToast = function(title, message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Botão de fechar
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => removeToast(toast));

        // Auto-remove após duração
        setTimeout(() => removeToast(toast), duration);
    };

    function removeToast(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }

    // --- 11. FUNÇÃO: LOADING STATES NOS BOTÕES ---
    // Adiciona loading state aos botões de CTA
    document.querySelectorAll('.btn-cta, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Apenas para demonstração - não bloqueia navegação
            if (this.href === '#' || this.type === 'submit') {
                e.preventDefault();
                
                // Adiciona loading state
                this.classList.add('btn-loading');
                const originalText = this.textContent;
                this.textContent = '';
                
                // Simula processo (remover em produção)
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                    this.textContent = originalText;
                    showToast('Success', 'Action completed successfully!', 'success');
                }, 2000);
            }
        });
    });

}); // Fim do DOMContentLoaded


// -------------------------------------------------------------
// --- NOVO BLOCO: LÓGICA DE HIDE PRELOADER (Corrigida) ---
// -------------------------------------------------------------
window.addEventListener('load', function() {
    // Garante que o preloader seja escondido DEPOIS que TUDO (DOM, imagens, CSS)
    // estiver carregado, adicionando um pequeno delay (500ms) para
    // garantir que a animação tenha tempo de ser executada.
    setTimeout(hidePreloader, 500); 
});