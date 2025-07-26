document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Cargar carrito desde localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    function renderCart() {
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-cart-arrow-down"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="index.html" class="btn">Ver Productos</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            return;
        }
        
        let html = '';
        let subtotal = 0;
        
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        
        const shipping = subtotal > 5000 ? 0 : 200; // Envío gratis sobre $5000
        const total = subtotal + shipping;
        
        cartItemsContainer.innerHTML = html;
        subtotalElement.textContent = `$${subtotal}`;
        shippingElement.textContent = shipping === 0 ? 'Gratis' : `$${shipping}`;
        totalElement.textContent = `$${total}`;
        checkoutBtn.disabled = false;
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const isPlus = this.classList.contains('plus');
                updateQuantity(id, isPlus);
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeItem(id);
            });
        });
    }
    
    function updateQuantity(id, isPlus) {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            if (isPlus) {
                cartItems[itemIndex].quantity++;
            } else if (cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity--;
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    }
    
    function removeItem(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
    
    // Finalizar compra
    checkoutBtn.addEventListener('click', function() {
        alert('Compra finalizada. ¡Gracias por tu compra!');
        localStorage.removeItem('cartItems');
        cartItems = [];
        renderCart();
    });
    
    // Renderizar carrito al cargar la página
    renderCart();
});
