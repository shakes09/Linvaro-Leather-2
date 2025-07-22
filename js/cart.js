document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector("#cart-content"); // container in your HTML
  const cartData = JSON.parse(localStorage.getItem("linvaroCart")) || [];

  // Helper to format price strings consistently
  function formatPrice(price) {
    return price.startsWith("R") ? price : `R${price}`;
  }

  if (cartData.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <img src="images/shopping-cart.png" alt="Empty Cart">
        <h2>Your cart is empty!</h2>
        <button onclick="window.location.href='catalogue.html'">Continue Shopping</button>
      </div>
    `;
    return; // stop further code execution
  }

  // Build the cart content with checkboxes and controls
  cartContainer.innerHTML = `
    <div class="select-all-container">
      <label><input type="checkbox" id="select-all" checked> Select / Deselect All</label>
    </div>
    <div id="cart-items-list"></div>
    <div class="cart-total">
      <strong>Total: </strong><span id="total-price">R0</span>
    </div>
    <div class="checkout-section">
      <button class="checkout-btn">Checkout</button>
    </div>
  `;

  const itemsList = document.getElementById("cart-items-list");
  const totalPriceEl = document.getElementById("total-price");
  const selectAllCheckbox = document.getElementById("select-all");

  // Render all cart items
  function renderItems() {
    itemsList.innerHTML = "";

    cartData.forEach((item, index) => {
      const itemTotal = parseFloat(item.price.replace("R", "")) * item.quantity;

      const itemHTML = document.createElement("div");
      itemHTML.classList.add("cart-item");
      itemHTML.dataset.index = index;
      itemHTML.innerHTML = `
        <input type="checkbox" class="item-checkbox" checked />
        <img src="${item.img}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.name}</h3>
          ${item.size ? `<p>Size: ${item.size}</p>` : ""}
          <p>Price: ${formatPrice(item.price)}</p>
          <p>Quantity: 
            <input type="number" class="quantity-input" min="1" value="${item.quantity}" />
          </p>
        </div>
        <button class="remove-btn">Remove</button>
      `;

      itemsList.appendChild(itemHTML);
    });
  }

  // Update total price of checked items
  function updateTotal() {
    let total = 0;

    const allItems = document.querySelectorAll(".cart-item");
    allItems.forEach(item => {
      const checkbox = item.querySelector(".item-checkbox");
      if (!checkbox.checked) return; // skip unchecked

      const quantityInput = item.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      const index = parseInt(item.dataset.index);

      const priceNum = parseFloat(cartData[index].price.replace("R", ""));
      total += priceNum * quantity;
    });

    totalPriceEl.textContent = `R${total.toFixed(2)}`;
  }

  // Save cart quantities back to localStorage
  function saveCart() {
    const allItems = document.querySelectorAll(".cart-item");
    allItems.forEach(item => {
      const index = parseInt(item.dataset.index);
      const quantityInput = item.querySelector(".quantity-input");
      cartData[index].quantity = parseInt(quantityInput.value);
    });
    localStorage.setItem("linvaroCart", JSON.stringify(cartData));
  }

  // Initial render and total update
  renderItems();
  updateTotal();

  // Handle select/deselect all checkbox
  selectAllCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".item-checkbox");
    checkboxes.forEach(cb => (cb.checked = selectAllCheckbox.checked));
    updateTotal();
  });

  // Delegate change events for item checkboxes and quantity inputs
  itemsList.addEventListener("change", (e) => {
    if (e.target.classList.contains("item-checkbox")) {
      // If any item unchecked, uncheck select all
      if (!e.target.checked) {
        selectAllCheckbox.checked = false;
      } else {
        // If all checked, check select all
        const allChecked = [...document.querySelectorAll(".item-checkbox")].every(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
      }
      updateTotal();
    }

    if (e.target.classList.contains("quantity-input")) {
      let val = parseInt(e.target.value);
      if (val < 1) e.target.value = 1; // enforce min 1
      saveCart();
      updateTotal();
    }
  });

  // Remove item from cart
  itemsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const itemDiv = e.target.closest(".cart-item");
      const index = parseInt(itemDiv.dataset.index);
      cartData.splice(index, 1);
      localStorage.setItem("linvaroCart", JSON.stringify(cartData));

      if (cartData.length === 0) {
        cartContainer.innerHTML = `
          <div class="empty-cart">
            <img src="images/shopping-cart.png" alt="Empty Cart">
            <h2>Your cart is empty!</h2>
            <button onclick="window.location.href='catalogue.html'">Continue Shopping</button>
          </div>
        `;
        return;
      }
      renderItems();
      updateTotal();
    }
  });

  // Checkout button placeholder
  const checkoutBtn = document.querySelector(".checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout functionality is not implemented yet.");
  });
});
