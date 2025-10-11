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
});