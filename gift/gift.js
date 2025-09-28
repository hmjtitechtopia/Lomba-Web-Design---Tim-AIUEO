document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.querySelector('.checkout-form');
  const MAX_CUSTOM_PRICE = 200000;

  const products = document.querySelectorAll(".product");
  const filters = document.querySelectorAll(".sidebar input[type=radio]");
  const customSection = document.getElementById("custom-section");

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-btn");
  const customAddToCartBtn = document.querySelector(".btn-cart-custom");
  const customPreview = document.getElementById("custom-preview");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const seeAllBtn = document.getElementById("see-all-btn");

  let cart = [];

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

    function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
  }

    const hamburgerBtn = document.querySelector('.hamburger');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", toggleSidebar);
    }

    document.addEventListener("click", (e) => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    if (sidebar.classList.contains("active") && 
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Keranjang masih kosong.</p>";
    } else {
      cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <span>Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
      });
    }
    const total = calculateTotal();
    cartTotalElement.textContent = `Rp ${total.toLocaleString("id-ID")}`;
    checkoutButton.disabled = cart.length === 0;
    clearCartBtn.disabled = cart.length === 0;
  }

  function addToCart(name, price, quantity = 1, showAlert = false) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }
    if (showAlert) {
      alert(`"${name}" telah ditambahkan ke keranjang!`);
    }
    renderCart();
    syncCheckoutUI();
  }

  function addCustomToCart(name, basePrice, qty = 1) {
    const subtotal = basePrice * qty;
    if (subtotal > MAX_CUSTOM_PRICE) {
      alert(`Subtotal untuk buket custom tidak boleh melebihi Rp ${MAX_CUSTOM_PRICE.toLocaleString("id-ID")}.`);
      return;
    }
    addToCart(name, basePrice, qty, true);
  }

  function applyFilters() {
    const size = document.querySelector("input[name='size']:checked")?.value;
    const harga = document.querySelector("input[name='harga']:checked")?.value;
    const color = document.querySelector("input[name='color']:checked")?.value;

    products.forEach(product => {
      const productSize = product.getAttribute("data-size");
      const productColor = product.getAttribute("data-color");
      const productPrice = parseInt(product.getAttribute("data-price"));

      let show = true;
      if (size && productSize !== size) show = false;
      if (color && productColor !== color) show = false;
      if (harga) {
        if (harga.includes("-")) {
          let [min, max] = harga.split("-").map(Number);
          min = min < 1000 ? min * 1000 : min;
          max = max < 1000 ? max * 1000 : max;
          if (productPrice < min || productPrice > max) show = false;
        } else if (harga.includes("+")) {
          let min = parseInt(harga.replace("+", ""));
          min = min < 1000 ? min * 1000 : min;
          if (productPrice < min) show = false;
        }
      }
      product.style.display = show ? "block" : "none";
    });
  }

  filters.forEach(filter => filter.addEventListener("change", applyFilters));

  if (seeAllBtn) {
    seeAllBtn.addEventListener("click", () => {
      filters.forEach(f => f.checked = false);
      products.forEach(p => p.style.display = "block");
    });
  }

  products.forEach(product => {
    product.addEventListener("click", () => {
      const name = product.querySelector("h4").textContent;
      const price = parseInt(product.getAttribute("data-price"));
      if (product.classList.contains("custom")) {
        customSection.style.display = "block";
        customSection.scrollIntoView({ behavior: "smooth" });
      } else {
        addToCart(name, price, 1, true);
      }
    });
  });

  const flowers = {
    "Keranjang Coklat":   { price: 10000, img: "../properti/custom/gift keranjang 1.png" },
    "Keranjang Putih":   { price: 10000, img: "../properti/custom/gift keranjang 10.png" },
    "Keranjang Biru":   { price: 10000, img: "../properti/custom/gift keranjang 9.png" },
    "Keranjang Kuning":   { price: 10000, img: "../properti/custom/gift keranjnag 6.png" },
    "Keranjang Pink":   { price: 10000, img: "../properti/custom/gift keranjang 4.png" },
    "Keranjang Ungu":   { price: 10000, img: "../properti/custom/gift keranjang 3.png" },
    "Mawar Merah":   { price: 5000, img: "../properti/pertangkai/mawar merah.png" },
    "Mawar Putih":   { price: 5000, img: "../properti/pertangkai/mawar putih.png" },
    "Mawar Kuning":  { price: 5000, img: "../properti/pertangkai/mawar kuning.png" },
    "Mawar Pink":    { price: 5000, img: "../properti/pertangkai/mawar pink.png" },
    "Mawar Ungu":    { price: 5000, img: "../properti/pertangkai/mawar ungu.png" },
    "Anggrek Putih": { price: 10000, img: "../properti/pertangkai/anggrek putih.png" },
    "Anggrek Kuning":{ price: 10000, img: "../properti/pertangkai/anggrek kuning.png" },
    "Anggrek Ungu":  { price: 10000, img: "../properti/pertangkai/anggrek ungu.png" },
    "Lily Orange":   { price: 15000, img: "../properti/pertangkai/lily orange.png" },
    "Lily Pink":     { price: 12000, img: "../properti/pertangkai/lily pink.png" },
    "Lily Putih":    { price: 15000, img: "../properti/pertangkai/lily putih.png" },
    "Bunga Matahari":{ price: 15000, img: "../properti/pertangkai/bunga matahari.png" }
  };

  const checkboxes = document.querySelectorAll('input[name="flower"]');
  const qtyInput = document.getElementById("flower-qty");
  const priceEl = document.getElementById("price");
  const subtotalEl = document.getElementById("subtotal");

  let selectedFlowers = ["Keranjang Coklat"];
  let qty = 1;

  function getCustomBasePrice() {
    return selectedFlowers.reduce((sum, flower) => sum + flowers[flower].price, 0);
  }

  function updateCustomDisplay() {
    const basePrice = getCustomBasePrice();
    const subtotal = basePrice * qty;
    priceEl.textContent = "Rp " + basePrice.toLocaleString("id-ID");
    subtotalEl.textContent = "Rp " + subtotal.toLocaleString("id-ID");
    if (selectedFlowers.length > 0) {
      const lastFlower = selectedFlowers[selectedFlowers.length - 1];
      customPreview.src = flowers[lastFlower].img;
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const tempSelected = [...selectedFlowers];
      if (checkbox.checked) {
        tempSelected.push(checkbox.value);
      } else {
        const index = tempSelected.indexOf(checkbox.value);
        if (index > -1) tempSelected.splice(index, 1);
      }
      selectedFlowers = tempSelected;
      updateCustomDisplay();
    });
  });

  document.getElementById("increase").addEventListener("click", () => {
    if (qty < 20) {
      qty++;
      qtyInput.value = qty;
      updateCustomDisplay();
    }
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtyInput.value = qty;
      updateCustomDisplay();
    }
  });

  customAddToCartBtn.addEventListener("click", () => {
    if (selectedFlowers.length === 0) {
      alert("Silakan pilih minimal 1 bunga untuk custom bouquet.");
      return;
    }
    const basePrice = getCustomBasePrice();
    addCustomToCart(`Custom Bouquet (${selectedFlowers.join(", ")})`, basePrice, qty);
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    products.forEach(product => {
      const name = product.dataset.name.toLowerCase();
      product.style.display = name.includes(keyword) ? "block" : "none";
    });
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
    syncCheckoutUI();
  });

  function syncCheckoutUI() {
    const checkoutSection = document.getElementById("checkout-section");
    const orderItems = document.getElementById("order-items");
    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryTotal = document.getElementById("summary-total");

    if (checkoutSection.style.display === "block") {
      orderItems.innerHTML = "";
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-line";
        div.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <span>Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</span>
        `;
        orderItems.appendChild(div);
      });
      const total = calculateTotal();
      summarySubtotal.textContent = "Rp " + total.toLocaleString("id-ID");
      summaryTotal.textContent = "Rp " + total.toLocaleString("id-ID");
    }
  }

  checkoutButton.addEventListener("click", () => {
    const checkoutSection = document.getElementById("checkout-section");
    checkoutSection.style.display = "block";
    checkoutSection.scrollIntoView({ behavior: "smooth" });
    syncCheckoutUI();
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Pembayaran berhasil! Terima kasih telah berbelanja di toko kami.');
      checkoutForm.reset();
      cart = [];
      renderCart();
      document.getElementById('checkout-section').style.display = 'none';
    });
  }

  renderCart();
  updateCustomDisplay();
});
