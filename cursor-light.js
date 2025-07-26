// cursor-light.js - Versión mejorada y optimizada
class CursorLight {
  constructor() {
    this.cursor = this.createCursor();
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.15;
    this.init();
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-light';
    document.body.appendChild(cursor);
    return cursor;
  }

  init() {
    // Configurar listeners
    document.addEventListener('mousemove', (e) => this.updateMousePosition(e));
    document.addEventListener('touchmove', () => this.hideCursor());
    document.addEventListener('mousedown', () => this.cursorClickEffect());
    
    // Iniciar animación
    requestAnimationFrame(() => this.updateCursorPosition());
    
    console.log('Cursor light inicializado correctamente');
  }

  updateMousePosition(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.cursor.style.opacity = '1';
  }

  updateCursorPosition() {
    // Suavizado del movimiento
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    
    // Aplicar transformación
    this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    
    // Continuar animación
    requestAnimationFrame(() => this.updateCursorPosition());
  }

  hideCursor() {
    this.cursor.style.opacity = '0';
  }

  cursorClickEffect() {
    this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) scale(0.8)`;
    setTimeout(() => {
      this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) scale(1)`;
    }, 100);
  }
}

// Inicializar solo en dispositivos con mouse
if (matchMedia('(hover: hover)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    new CursorLight();
  });
}
