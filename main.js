document.addEventListener('DOMContentLoaded', function() {
    // Carrito de compras
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Actualizar contador del carrito
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }
    
    // Añadir al carrito con validación mejorada
    function addToCart(product) {
        // Verificar si el producto ya está en el carrito (comparación más estricta)
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (!existingItem) {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1  // Inicializar cantidad en 1
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            showNotification('✅ Producto añadido al carrito');
            return true;
        } else {
            showNotification('⚠️ Este producto ya está en tu carrito', true);
            return false;
        }
    }
    
    // Notificaciones mejoradas (posición fija arriba)
    function showNotification(message, isError = false) {
        // Crear contenedor de notificaciones si no existe
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(notificationContainer);
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.innerHTML = message;
        notification.style.cssText = `
            padding: 12px 20px;
            border-radius: 5px;
            color: white;
            background: ${isError ? '#ff4444' : '#4CAF50'};
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        notificationContainer.appendChild(notification);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Agregar estilos CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Eventos para botones "Añadir al carrito" (versión mejorada)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.getAttribute('data-product-id') || this.getAttribute('data-product'),
                name: this.closest('.product-card').querySelector('h3').textContent,
                price: this.closest('.product-card').querySelector('p').textContent
            };
            
            const wasAdded = addToCart(product);
            
            // Animación de feedback mejorada
            if (wasAdded) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Añadido';
                this.style.backgroundColor = '#4CAF50';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Inicializar contador
    updateCartCount();
    
    // Limpiar notificaciones antiguas al recargar
    const oldContainer = document.getElementById('notification-container');
    if (oldContainer) oldContainer.remove();
});
