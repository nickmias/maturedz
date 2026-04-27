document.addEventListener("DOMContentLoaded", () => {
    // --- 1. LOADER LOGIC ---
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
            setTimeout(() => {
                loader.remove();
            }, 300); 
        }, 300); 
    });

    // --- 2. SOUND LOGIC ---
    const bgSound = document.getElementById("bg-sound");
    const soundToggle = document.getElementById("sound-toggle");
    let isPlaying = false;

    // Cek jika tombol sound ada (mencegah error jika dihapus)
    if (soundToggle && bgSound) {
        soundToggle.addEventListener("click", () => {
            if (!isPlaying) {
                bgSound.play();
                soundToggle.innerText = "SOUND: ON";
            } else {
                bgSound.pause();
                soundToggle.innerText = "SOUND: OFF";
            }
            isPlaying = !isPlaying;
        });
    }

    // --- 3. CART & NOTIFICATION LOGIC ---
    let cart = [];
    const cartCountElement = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    function showNotification(message, isError = false) {
        const notif = document.createElement("div");
        notif.innerText = message;
        Object.assign(notif.style, {
            position: "fixed", bottom: "20px", right: "20px",
            backgroundColor: "#000", color: isError ? "red" : "white",
            padding: "1rem", border: "2px solid", borderColor: isError ? "red" : "white",
            fontWeight: "700", zIndex: "10000", boxShadow: "5px 5px 0px grey",
            textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif"
        });
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = this.getAttribute("data-product");
            const sizeId = this.getAttribute("data-size");
            const colorId = this.getAttribute("data-color");
            
            const sizeElement = document.getElementById(sizeId);
            const colorElement = document.getElementById(colorId);

            const size = sizeElement.value;
            const color = colorElement.value;

            if (size === "SIZE" || color === "COLOR" || !size || !color) {
                showNotification("[-] SELECT SIZE/COLOR", true);
                return;
            }

            cart.push({ product, size, color });
            cartCountElement.innerText = cart.length;
            showNotification(`[+] ${product} ADDED`);

            // Reset dropdown
            sizeElement.selectedIndex = 0;
            colorElement.selectedIndex = 0;
        });
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return showNotification("[-] CART EMPTY", true);
        
        let text = "ORDER MATUREDZINTHOUGHT:%0A%0A";
        cart.forEach((i, index) => text += `[00${index + 1}] ${i.product} - ${i.color} (${i.size})%0A`);
        text += "%0A*AWAITING CONFIRMATION.*";
        
        // Ganti dengan nomor WA aslimu
        window.open(`https://wa.me/6287824381467?text=${text}`, "_blank");
    });
});