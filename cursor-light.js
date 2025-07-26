// cursor-light.js - Versión optimizada
document.addEventListener('DOMContentLoaded', () => {
    // Crear elemento de luz
    const cursorLight = document.createElement('div');
    cursorLight.className = 'cursor-light';
    document.body.appendChild(cursorLight);
    
    // Configuración inicial
    let mouseX = 0;
    let mouseY = 0;
    let lightX = 0;
    let lightY = 0;
    const speed = 0.2; // Ajusta la suavidad del movimiento (0.1 = más lento, 0.5 = más rápido)
    
    // Actualizar posición con suavizado
    function updatePosition() {
        const distX = mouseX - lightX;
        const distY = mouseY - lightY;
        
        lightX = lightX + (distX * speed);
        lightY = lightY + (distY * speed);
        
        cursorLight.style.transform = `translate(${lightX - 75}px, ${lightY - 75}px)`;
        
        requestAnimationFrame(updatePosition);
    }
    
    // Seguir movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Ocultar en dispositivos táctiles
    document.addEventListener('touchstart', () => {
        cursorLight.style.opacity = '0';
    });
    
    // Mostrar al usar mouse
    document.addEventListener('mousemove', () => {
        cursorLight.style.opacity = '1';
    });
    
    // Iniciar animación
    updatePosition();
    
    // Debug (opcional)
    console.log('Efecto de luz del cursor iniciado correctamente');
});
