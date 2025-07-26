document.addEventListener('DOMContentLoaded', function() {
  // Menu hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Filtrado de productos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Carrito de compras
  const cartCount = document.querySelector('.cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Actualizar contador del carrito
  function updateCartCount() {
    cartCount.textContent = cartItems.length;
  }
  
  // Inicializar contador
  updateCartCount();
  
  // Añadir producto al carrito
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.getAttribute('data-product');
      
      // Animación de añadir al carrito
      this.innerHTML = '<i class="fas fa-check"></i> Añadido';
      this.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        this.innerHTML = 'Añadir <i class="fas fa-shopping-cart"></i>';
        this.style.backgroundColor = '';
      }, 2000);
      
      // Añadir producto al carrito
      cartItems.push(product);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      
      // Mostrar notificación
      showNotification('Producto añadido al carrito');
    });
  });
  
  // Mostrar notificación
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  // Animaciones al hacer scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar al cargar la página
  
  // Formulario de newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      // Validación simple
      if (emailInput.value && emailInput.value.includes('@')) {
        showNotification('¡Gracias por suscribirte!');
        emailInput.value = '';
      } else {
        showNotification('Por favor ingresa un email válido');
      }
    });
  }
});

// Stock de productos (stock.js)
const stockProductos = {
  "trueno": 15,
  "gangster": 8,
  "newyork": 0,
  "torkeestatua": 5,
  // Agregar más productos según sea necesario
};

function mostrarStock(productoId) {
  const cantidad = stockProductos[productoId];
  const stockSpan = document.getElementById('stock-cantidad');
  const botonComprar = document.getElementById('boton-comprar');

  if (cantidad === undefined) return;

  if (cantidad === 0) {
    stockSpan.textContent = 'Agotado';
    stockSpan.style.color = '#ff6b6b';
    if (botonComprar) {
      botonComprar.disabled = true;
      botonComprar.textContent = 'Sin stock';
      botonComprar.style.backgroundColor = '#ccc';
      botonComprar.style.cursor = 'not-allowed';
    }
  } else if (cantidad < 5) {
    stockSpan.textContent = `Últimas ${cantidad} unidades`;
    stockSpan.style.color = '#ffa502';
  } else {
    stockSpan.textContent = `En stock (${cantidad})`;
    stockSpan.style.color = '#2ed573';
  }
}

// Luz que sigue al cursor (cursor-light.js)
const light = document.createElement('div');
light.className = 'cursor-light';
document.body.appendChild(light);

window.addEventListener('mousemove', (e) => {
  light.style.transform = `translate(${e.clientX - 75}px, ${e.clientY - 75}px)`;
});
