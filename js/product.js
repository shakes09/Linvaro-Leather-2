// product.js

// Sample product list
// products.js

const products = [
  
  {
    id: 1,
    name: "Elegant Watch",
    price: "R7499",
    desc: "An elegant watch for special occasions.",
    img: "images/products/product2.jpg",
    category: "wearables",
    exclusive: true,
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: "R2299",
    desc: "Handcrafted leather wallet to carry your essentials.",
    img: "images/products/product3.jpg",
    category: "accessories",
    exclusive: true,
  },
  {
    id: 3,
    name: "Classic Leather Bag",
    price: "R500",
    desc: "A classic leather bag for everyday use.",
    img: "images/products/bag1.jpg",
    category: "bags",
    exclusive: false,
  },
  {
    id: 4,
    name: "Luxury Leather Bag",
    price: "R4,999",
    desc: "A luxury leather bag for those special one of a kind days.",
    img: "images/products/product1.jpg",
    category: "bags",
    exclusive: false,
  },
  {
    id: 5,
    name: "Classic Leather Bag",
    price: "R7,499",
    desc: "A stylish watch that goes with anything or anyone.",
    img: "images/products/product2.jpg",
    category: "accessories",
    exclusive: false,
  },
  {
    id: 6,
    name: "Leather Watch",
    price: "R2,299",
    desc: "A classic leather watch for everyday use.",
    img: "images/products/product3.jpg",
    category: "accessories",
    exclusive: false,
  },
  // add more products here...
];


// Utility: get URL query parameter by name
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Update product details on page
function updateProductDetails() {
  const name = getQueryParam("name");
  const price = getQueryParam("price");
  const desc = getQueryParam("desc");
  const img = getQueryParam("img");

  if (!name) {
    window.location.href = "catalogue.html";
    return;
  }

  document.getElementById("product-name").textContent = decodeURIComponent(name);
  document.getElementById("product-description").textContent = decodeURIComponent(desc || "");
  document.getElementById("product-price").textContent = price || "";

  const mainImageDiv = document.getElementById("main-product-image");
  mainImageDiv.style.backgroundImage = `url(${img})`;
  mainImageDiv.style.backgroundSize = "cover";
  mainImageDiv.style.backgroundPosition = "center";
}

// Populate “You might also like” recommendations (exclude current product)
function populateRecommendations() {
  const currentName = decodeURIComponent(getQueryParam("name") || "");
  const recommendationContainer = document.getElementById("recommendation-list");
  recommendationContainer.innerHTML = "";

  // Filter products excluding current
  const recommended = products.filter(p => p.name !== currentName);

  // Optional: show only 3 recommendations (or less)
  recommended.slice(0, 3).forEach(product => {
    const item = document.createElement("a");
    item.href = `product.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&desc=${encodeURIComponent(product.desc)}&img=${encodeURIComponent(product.img)}`;
    item.className = "recommendation-item";

    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>${product.price}</p>
    `;

    recommendationContainer.appendChild(item);
  });
}

// Setup plus and minus quantity buttons
function setupQuantityButtons() {
  const minusBtn = document.querySelector(".quantity-button.minus");
  const plusBtn = document.querySelector(".quantity-button.plus");
  const quantityInput = document.getElementById("quantity");

  minusBtn.addEventListener("click", () => {
    let current = parseInt(quantityInput.value) || 1;
    if (current > 1) quantityInput.value = current - 1;
  });

  plusBtn.addEventListener("click", () => {
    let current = parseInt(quantityInput.value) || 1;
    quantityInput.value = current + 1;
  });
}

// Update cart count badge in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("linvaroCart")) || [];
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCounter = document.getElementById("cart-count");
  if (!cartCounter) return;

  cartCounter.textContent = totalCount;
  if (totalCount > 0) {
    cartCounter.classList.remove("hide");
  } else {
    cartCounter.classList.add("hide");
  }
}

// Handle add to cart form submit
function setupAddToCartForm() {
  const form = document.getElementById("add-to-cart-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = decodeURIComponent(getQueryParam("name"));
    const price = getQueryParam("price");
    const desc = decodeURIComponent(getQueryParam("desc") || "");
    const img = getQueryParam("img");
    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput.value) || 1;

    if (!name) {
      alert("Invalid product data.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("linvaroCart")) || [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, desc, img, quantity });
    }

    localStorage.setItem("linvaroCart", JSON.stringify(cart));
    updateCartCount();

    alert(`Added ${quantity} "${name}" to your cart.`);
  });
}

// Initialize everything on page load
function init() {
  updateProductDetails();
  populateRecommendations();
  setupQuantityButtons();
  setupAddToCartForm();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", init);

