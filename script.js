document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Cart State
    let cart = [];
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    const closeCartBtn = document.getElementById('closeCart');
    const cartToggleBtns = document.querySelectorAll('.cart-toggle');
    const addToCartBtn = document.getElementById('addToCart');
    const quantityInput = document.getElementById('quantity');
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Toggle Cart
    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    }));
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    // Quantity Selector
    if (decreaseQtyBtn && increaseQtyBtn && quantityInput) {
        decreaseQtyBtn.addEventListener('click', () => {
            let val = parseInt(quantityInput.value);
            if (val > 1) quantityInput.value = val - 1;
        });

        increaseQtyBtn.addEventListener('click', () => {
            let val = parseInt(quantityInput.value);
            quantityInput.value = val + 1;
        });
    }

    // Add to Cart Logic
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const qty = parseInt(quantityInput.value) || 1;
            const price = 1469600;
            
            // Check if item exists
            const existingItem = cart.find(item => item.id === 'deepsea');
            if (existingItem) {
                existingItem.quantity += qty;
            } else {
                cart.push({
                    id: 'deepsea',
                    name: 'Rolex Deepsea',
                    price: price,
                    quantity: qty,
                    image: document.querySelector('.shop-main-img').src
                });
            }
            
            updateCartUI();
            toggleCart();
        });
    }

    // Update Cart UI
    const updateCartUI = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color: #6b7280; margin-top: 20px;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>₹ ${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        <span style="font-size: 0.85rem; color: #6b7280;">Qty: ${item.quantity}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartTotalElement.innerText = `₹ ${total.toLocaleString('en-IN')}`;
    };

    // Shop Gallery
    const thumbnails = document.querySelectorAll('.shop-thumbnails img');
    const mainImg = document.querySelector('.shop-main-img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class
            this.classList.add('active');
            // Change main image source
            mainImg.src = this.src;
        });
    });
});
