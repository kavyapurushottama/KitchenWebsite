// ✅ main.js (Fixed and Enhanced)

const user = JSON.parse(localStorage.getItem("user"));
const nav = document.getElementById("nav-items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (user && nav) {
  nav.innerHTML = `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle"></i> ${user.name}
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="cart.html">My Cart <span id="cart-count" class="badge bg-secondary ms-1">${cart.length}</span></a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
      </ul>
    </li>
  `;
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Dishes
const dishes = [
  { name: "Pasta Alfredo", price: 210, image: "images/Pasta.png" },
  { name: "Veg Biryani", price: 180, image: "images/Veg_Biryani.png" },
  { name: "Margherita Pizza", price: 220, image: "images/Pizza.png" },
  {
    name: "Paneer Butter Masala",
    price: 240,
    image: "images/Butter_Masala.png",
  },
  { name: "Masala Dosa", price: 90, image: "images/Dosa.png" },
  { name: "Blue Logoon Mocktail", price: 120, image: "images/Mocktail.png" },
];

const dishList = document.getElementById("dish-list");
const cartCount = document.getElementById("cart-count");
const navSearchInput = document.getElementById("search-bar");

function renderDishes(filter = "") {
  if (!dishList) return;
  dishList.innerHTML = "";
  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach((dish, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
      <div class="card dish-card">
        <img src="${dish.image}" class="card-img-top dish-img" alt="${dish.name}" />
        <div class="card-body">
          <h5 class="card-title">${dish.name}</h5>
          <p class="card-text">Price: ₹${dish.price}</p>
          <button class="button button-brand" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      </div>
    `;
    dishList.appendChild(card);
  });
}

function addToCart(index) {
  const item = dishes[index];
  const existingIndex = cart.findIndex((i) => i.name === item.name);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  if (cartCount)
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function filterExpenses() {
  const keyword = navSearchInput ? navSearchInput.value : "";
  renderDishes(keyword);
}

if (navSearchInput) {
  navSearchInput.addEventListener("input", () => filterExpenses());
}

window.filterExpenses = filterExpenses;
renderDishes();
updateCart();
