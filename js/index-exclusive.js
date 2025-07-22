document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("exclusive-picks-container");
  if (!container) return;

  // For this example, take first 3 products as Exclusive Picks
  const exclusivePicks = products.slice(0, 3);

  exclusivePicks.forEach(product => {
    const url = `product.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&desc=${encodeURIComponent(product.desc)}&img=${encodeURIComponent(product.img)}`;

    const a = document.createElement("a");
    a.href = url;
    a.className = "product-card";

    a.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <p class="product-name">${product.name}</p>
      <p class="product-price">${product.price}</p>
    `;

    container.appendChild(a);
  });
});
