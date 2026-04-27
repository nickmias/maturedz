document.addEventListener("DOMContentLoaded", () => {
    // State Management untuk menyimpan data keranjang
    let cart = [];
    const cartCountElement = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Fungsi Custom Notification bergaya Brutalist/Terminal
    function showNotification(message, isError = false) {
        // Hapus notifikasi lama jika ada
        const existingNotif = document.querySelector(".custom-notif");
        if (existingNotif) existingNotif.remove();

        // Buat elemen notifikasi baru
        const notif = document.createElement("div");
        notif.className = "custom-notif";
        notif.innerText = message;

        // Styling langsung via JS agar tidak perlu ubah file CSS lagi
        Object.assign(notif.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#000000",
            color: isError ? "#ff3333" : "#ffffff", // Merah untuk error, Putih untuk sukses
            padding: "1rem 1.5rem",
            border: `2px solid ${isError ? "#ff3333" : "#ffffff"}`,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            zIndex: "1000",
            boxShadow: `4px 4px 0px ${isError ? "#ff3333" : "#ffffff"}`,
            transition: "all 0.3s ease",
            opacity: "0",
            transform: "translateY(20px)"
        });

        document.body.appendChild(notif);

        // Animasi masuk
        setTimeout(() => {
            notif.style.opacity = "1";
            notif.style.transform = "translateY(0)";
        }, 10);

        // Animasi keluar otomatis setelah 3 detik
        setTimeout(() => {
            notif.style.opacity = "0";
            notif.style.transform = "translateY(20px)";
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // Logika Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productName = this.getAttribute("data-product");
            const sizeId = this.getAttribute("data-size");
            const colorId = this.getAttribute("data-color");
            
            const sizeElement = document.getElementById(sizeId);
            const colorElement = document.getElementById(colorId);

            const sizeValue = sizeElement.value;
            const colorValue = colorElement.value;

            // Validasi: pastikan user sudah memilih ukuran dan warna
            if (!sizeValue || sizeValue === "SIZE" || !colorValue || colorValue === "COLOR") {
                showNotification(`[-] SELECT SIZE AND COLOR FOR ${productName}.`, true);
                return;
            }

            // Masukkan data ke array keranjang
            cart.push({
                product: productName,
                size: sizeValue,
                color: colorValue
            });

            // Update angka di navbar
            cartCountElement.innerText = cart.length;

            // Tampilkan notifikasi sukses
            showNotification(`[+] ADDED: ${productName} | ${sizeValue} | ${colorValue}`);

            // Reset pilihan dropdown setelah dimasukkan ke keranjang
            sizeElement.selectedIndex = 0;
            colorElement.selectedIndex = 0;
        });
    });

    // Logika Checkout (Generate Link WhatsApp)
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showNotification("[-] YOUR CART IS EMPTY. ADD ITEMS FIRST.", true);
            return;
        }

        showNotification("[✓] REDIRECTING TO SECURE CHECKOUT...");

        // Format pesan otomatis untuk WhatsApp
        let orderText = "SYSTEM ORDER INITIATED:%0A%0A";
        
        cart.forEach((item, index) => {
            orderText += `[00${index + 1}] ${item.product} - ${item.color} (${item.size})%0A`;
        });
        
        orderText += "%0A*AWAITING CONFIRMATION.*";

        // Ganti nomor ini dengan nomor WhatsApp admin / brand kamu (gunakan kode negara 62)
        const whatsappNumber = "6287824381467";
        const waLink = `https://wa.me/${whatsappNumber}?text=${orderText}`;

        // Beri jeda 1.5 detik agar animasi notifikasi terlihat sebelum pindah tab
        setTimeout(() => {
            window.open(waLink, "_blank");
        }, 1500);
    });
});