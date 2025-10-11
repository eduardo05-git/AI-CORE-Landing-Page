document.addEventListener('DOMContentLoaded', (event) => {
    // Seleciona todos os elementos com a classe 'hidden-element'
    const elementsToAnimate = document.querySelectorAll('.hidden-element');

    // Define um atraso de 800 milissegundos (0.8s) para dar foco ao Hero
    setTimeout(() => {
        elementsToAnimate.forEach((element, index) => {
            // Adiciona um atraso sequencial para um efeito mais elegante
            element.style.transitionDelay = `${index * 0.1}s`; 
            
            // Remove a classe de esconder e adiciona a de mostrar
            element.classList.remove('hidden-element');
            element.classList.add('visible-element');
        });
    }, 800); 
});