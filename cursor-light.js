// cursor-light.js - Versión corregida
class CursorLight {
  constructor() {
    this.cursor = this.createCursor();
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.15;
    
    // Solo activar en dispositivos con mouse
    if (matchMedia('(hover: hover)').matches) {
      this.init();
    }
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-light';
    document.body.appendChild(cursor);
    return cursor;
  }

  init() {
    document.addEventListener('mousemove', (e) => this.updateMousePosition(e));
    requestAnimationFrame(() => this.updateCursorPosition());
  }

  updateMousePosition(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  updateCursorPosition() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    
    this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    requestAnimationFrame(() => this.updateCursorPosition());
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  new CursorLight();
});
