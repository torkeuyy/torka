document.addEventListener('DOMContentLoaded', function() {
    // Carrito de compras
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Actualizar contador del carrito
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }
    
    // Añadir al carrito con validación
    function addToCart(product) {
        if (!cartItems.includes(product)) {
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            showNotification('Producto añadido al carrito');
            return true;
        } else {
            showNotification('Este producto ya está en tu carrito', true);
            return false;
        }
    }
    
    // Notificaciones mejoradas
    function showNotification(message, isError = false) {
        const oldNotifications = document.querySelectorAll('.custom-notification');
        oldNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification ${isError ? 'error' : 'success'}`;
        notification.innerHTML = `
            <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(200%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Eventos para botones "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const wasAdded = addToCart(product);
            
            // Animación de feedback
            if (wasAdded) {
                this.innerHTML = '<i class="fas fa-check"></i> Añadido';
                this.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    this.innerHTML = 'Añadir <i class="fas fa-shopping-cart"></i>';
                    this.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
    // Inicializar contador
    updateCartCount();
    
    // [El resto de tu código existente...]
});
