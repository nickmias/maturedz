document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {

                loader.style.opacity = "0";
                loader.style.visibility = "hidden";

                setTimeout(() => {
                    loader.remove();
                }, 500);

            }

        }, 1200);

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
        notif.style.background = "#000";
        notif.style.color = error ? "#ff0000" : "#ffffff";
        notif.style.border = error
            ? "2px solid #ff0000"
            : "2px solid #ffffff";

        notif.style.padding = "15px 20px";
        notif.style.fontWeight = "700";
        notif.style.zIndex = "99999";
        notif.style.fontFamily = "Montserrat, sans-serif";
        notif.style.textTransform = "uppercase";

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

            showNotification(`${product} Added`);

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

            let message =
`Halo MATUREDZINTHOUGHT,

Saya ingin melakukan pemesanan:

`;

            cart.forEach((item, index) => {

                message +=
`${index + 1}. ${item.product}
Size : ${item.size}
Color : ${item.color}

`;

            });

            message +=
`Mohon konfirmasi ketersediaan barang.

Terima kasih.`;

            const whatsappNumber = "628561422005";

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    }

});