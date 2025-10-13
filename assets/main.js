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

     // --- 5. FUNÇÃO: ANIMAÇÃO DE PARTÍCULAS (tsParticles) ---
    if (window.tsParticles) {
        tsParticles.load({
            id: 'tsparticles',
            options: {
                preset: 'links',
                background: {
                    color: {
                        value: 'transparent'
                    }
                },
                particles: {
                    color: {
                        value: '#00bcd4'
                    },
                    links: {
                        color: '#00bcd4',
                        distance: 150,
                        enable: true,
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800
                        },
                        value: 80
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: 'circle'
                    },
                    size: {
                        value: { min: 1, max: 3 }
                    }
                },
                detectRetina: true,
            }
        });
    }
});