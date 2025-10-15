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


document.addEventListener('DOMContentLoaded', (event) => {

    // --- 1. FUNÇÃO: PROGRESSIVE LOADING (Correção de Timing para Fluidez) ---
    // --- 1. FUNÇÃO: PROGRESSIVE LOADING (Correção de Fluidez Definitiva) ---
const elementsToAnimate = document.querySelectorAll('.hidden-element');

// Define um atraso de 800 milissegundos (0.8s) para dar foco ao Hero
setTimeout(() => {
    elementsToAnimate.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`; 

        // 💥 CORREÇÃO CRÍTICA: Forçar o Recálculo do CSS (Flushing) 💥
        // Isso garante que o navegador reconheça o 'opacity: 0' antes de remover a classe.
        void element.offsetWidth; 

        // 2. Remove a classe para iniciar a transição suave
        element.classList.remove('hidden-element');
        element.classList.add('visible-element');
    });
}, 800); 

// ... (O restante do seu código JavaScript abaixo, como o startTypingEffect, permanece inalterado) ...

    // --- 2. FUNÇÃO: MÁQUINA DE ESCREVER (Typing Effect) ---
    // (Mantenha sua função startTypingEffect intacta aqui)
    // ...

    // INICIA O EFEITO DE DIGITAÇÃO
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
            // Create success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = `
                <div style="background: #00bcd4; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 15px;">
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    Thank you! Check your email for access instructions.
                </div>
            `;
            
            heroForm.appendChild(successDiv);
            
            // Reset form
            emailInput.value = '';
            
            // Remove success message after 5 seconds
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
});