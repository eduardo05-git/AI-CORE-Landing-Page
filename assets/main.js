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

    // Cria a mensagem de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'global-success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 73%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-primary-accent); /* Usando a variável ciano */
        color: var(--color-dark-bg);
        padding: 20px 30px;
        border-radius: 8px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        font-weight: 600;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
        Thank you! Check your email for access instructions.
    `;

    // ANEXA AO BODY, não ao formulário, para evitar o bug de layout
    document.body.appendChild(successDiv);

    // Reset form
    document.getElementById('hero-email').value = '';

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
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
    
    if (carouselTrack && indicators.length > 0) {
        let currentSlide = 0;
        const totalSlides = 12; // Número total de features únicas
        const slideWidth = 345; // Largura de cada card (320px) + gap (25px)
        let isHovered = false;
        let isManuallyControlled = false;
        let autoPlayInterval;
        
        // Função para atualizar indicadores
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
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
        
        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                isManuallyControlled = true;
                moveToSlide(index);
                
                // Permite que o auto-play retome após 15 segundos
                setTimeout(() => {
                    isManuallyControlled = false;
                }, 15000);
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
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                moveToSlide(currentSlide);
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides;
                moveToSlide(currentSlide);
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
                // 2. Usa o scrollIntoView com a opção 'smooth'
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinha o topo da seção ao topo da viewport
                });

                // 3. Atualiza o URL (opcional, para refletir o hash na URL)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
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