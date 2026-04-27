// Cart management
let cart = [];
const WHATSAPP_NUMBER = '6287824381467';

function addToCart(nama, sizeId, warnaId) {
    const sizeElement = document.getElementById(sizeId);
    const warnaElement = document.getElementById(warnaId);

    if (!sizeElement || !warnaElement) {
        console.error('Invalid product IDs');
        return false;
    }

    const size = sizeElement.value;
    const warna = warnaElement.value;

    if (!nama || !size || !warna) {
        console.error('Missing product information');
        return false;
    }

    cart.push({ nama, size, warna });
    updateCartCount();
    showNotification('Added to cart! ✓');
    return true;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty 😅');
        return false;
    }

    let message = 'Halo, saya ingin order:%0A%0A';

    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.nama} - ${item.size} - ${item.warna}%0A`;
    });

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Clear cart after checkout
    cart = [];
    updateCartCount();
    return true;
}

function showNotification(message) {
    // Simple notification - could be enhanced with a toast library
    console.log(message);
}

// Initialize event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();

    // Setup add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.product;
            const sizeId = this.dataset.size;
            const colorId = this.dataset.color;
            addToCart(productName, sizeId, colorId);
        });
    });

    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Add smooth scroll behavior (fallback for older browsers)
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});