document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */
    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.style.clipPath = "polygon(0 0,100% 0,100% 0,0 0)";

                setTimeout(() => {
                    loader.remove();
                }, 800);
            }
        }, 500);
    });

    /* =========================
       SOUND SYSTEM
    ========================= */
    const bgSound = document.getElementById("bg-sound");
    const soundToggle = document.getElementById("sound-toggle");

    let isPlaying = false;

    if (soundToggle && bgSound) {
        soundToggle.addEventListener("click", () => {

            if (!isPlaying) {
                bgSound.play();
                soundToggle.textContent = "SOUND: ON";
            } else {
                bgSound.pause();
                soundToggle.textContent = "SOUND: OFF";
            }

            isPlaying = !isPlaying;
        });
    }

    /* =========================
       CART SYSTEM
    ========================= */
    let cart = [];

    const cartCount = document.getElementById("cart-count");
    const addButtons = document.querySelectorAll(".add-to-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function showNotification(message, error = false) {

        const notif = document.createElement("div");

        notif.textContent = message;

        notif.style.position = "fixed";
        notif.style.bottom = "20px";
        notif.style.right = "20px";
        notif.style.padding = "15px 20px";
        notif.style.background = "#000";
        notif.style.color = error ? "#ff0000" : "#ffffff";
        notif.style.border = error
            ? "2px solid #ff0000"
            : "2px solid #ffffff";

        notif.style.fontWeight = "700";
        notif.style.zIndex = "99999";
        notif.style.textTransform = "uppercase";
        notif.style.fontFamily = "Montserrat, sans-serif";

        document.body.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 2500);
    }

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const product = button.dataset.product;
            const sizeId = button.dataset.size;
            const colorId = button.dataset.color;

            const sizeElement = document.getElementById(sizeId);
            const colorElement = document.getElementById(colorId);

            if (!sizeElement || !colorElement) return;

            const size = sizeElement.value;
            const color = colorElement.value;

            if (!size || !color) {
                showNotification("Select Size & Color", true);
                return;
            }

            cart.push({
                product,
                size,
                color
            });

            updateCartCount();

            showNotification(product + " Added");

            sizeElement.selectedIndex = 0;
            colorElement.selectedIndex = 0;
        });

    });

    /* =========================
       CHECKOUT WHATSAPP
    ========================= */

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {
                showNotification("Cart Empty", true);
                return;
            }

            let message = "Halo MATUREDZINTHOUGHT,\n\n";
            message += "Saya ingin melakukan pemesanan:\n\n";

            cart.forEach((item, index) => {

                message +=
                    (index + 1) + ". " + item.product + "\n" +
                    "Size : " + item.size + "\n" +
                    "Color : " + item.color + "\n\n";

            });

            message += "Mohon konfirmasi ketersediaan barang.\n\n";
            message += "Terima kasih.";

            // Ganti nomor WA lu di sini
            const whatsappNumber = "628561422005";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber = "628561422005";
                "?text=" +
                encodeURIComponent(message);

            window.open(whatsappURL, "_blank");
        });

    }

});