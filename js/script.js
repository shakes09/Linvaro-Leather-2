// === PRODUCT SLIDER (index.html) ===
document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".slider-track");
  const leftBtn = document.querySelector(".slider-btn.left");
  const rightBtn = document.querySelector(".slider-btn.right");

  document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cartContainer');

  // Simulated cart items - You can change or load dynamically later
  const cartItems = [
    {
      name: "Black Hoodie",
      image: "https://via.placeholder.com/80?text=Hoodie",
      size: "M",
      quantity: 1,
      price: 399,
      selected: true
    },
    {
      name: "Sneakers",
      image: "https://via.placeholder.com/80?text=Sneakers",
      size: "9",
      quantity: 2,
      price: 599,
      selected: false
    }
  ];

  function renderCart() {
    cartContainer.innerHTML = ""; // clear previous content

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" class="cart-img" />
          <h2>Your cart is empty</h2>
          <p>Add something to your cart to get started.</p>
          <a href="catalogue.html" class="button-style">Browse Products</a>
        </div>
      `;
      return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      if (item.selected) total += itemTotal;

      cartContainer.innerHTML += `
        <div class="cart-item">
          <label>
            <input type="checkbox" data-index="${index}" ${item.selected ? "checked" : ""}>
          </label>
          <div class="cart-details">
            <img src="${item.image}" class="cart-img-sm" />
            <div class="cart-info">
              <h3>${item.name}</h3>
              <div class="size">Size: ${item.size}</div>
              <div class="quantity">Qty: ${item.quantity}</div>
              <div class="price">R${itemTotal}</div>
            </div>
          </div>
        </div>
      `;
    });

    cartContainer.innerHTML += `
      <div class="cart-total">Total: R${total}</div>
    `;

    // Add checkbox logic
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        cartItems[index].selected = e.target.checked;
        renderCart();
      });
    });
  }

  renderCart();
});


  if (sliderTrack && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      sliderTrack.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      sliderTrack.scrollBy({ left: 300, behavior: "smooth" });
    });

    // Enable swipe support for touch devices
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    sliderTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      sliderTrack.classList.add('dragging');
      startX = e.pageX - sliderTrack.offsetLeft;
      scrollLeft = sliderTrack.scrollLeft;
    });
    sliderTrack.addEventListener('mouseleave', () => {
      isDown = false;
      sliderTrack.classList.remove('dragging');
    });
    sliderTrack.addEventListener('mouseup', () => {
      isDown = false;
      sliderTrack.classList.remove('dragging');
    });
    sliderTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderTrack.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      sliderTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    sliderTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - sliderTrack.offsetLeft;
      scrollLeft = sliderTrack.scrollLeft;
    });
    sliderTrack.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - sliderTrack.offsetLeft;
      const walk = (x - startX) * 2;
      sliderTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // Hero slider automatic fade
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 6000); // change slide every 6 seconds

  // Initialize first slide
  showSlide(currentSlide);

  // === PRODUCT FILTERS (catalogue.html) ===
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove "active" class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.getAttribute("data-category");

        productCards.forEach(card => {
          const matches = category === "all" || card.getAttribute("data-category") === category;
          card.style.display = matches ? "block" : "none";
        });
      });
    });
  }
});

