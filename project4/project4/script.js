let allProducts = [];

function loadCart() {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

let cart = loadCart();

function renderCart() {
  const cartEl = document.getElementById('cart');
  cartEl.innerHTML = '';
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      cart.splice(idx, 1);
      saveCart();
    };
    li.appendChild(removeBtn);
    cartEl.appendChild(li);
  });
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

async function loadProducts() {
  try {
    const res = await fetch('products.json');
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error('Failed to load products:', err);
  }
}

function renderProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const desc = document.createElement('p');
    desc.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add to Cart';
    addBtn.onclick = () => {
      cart.push(product);
      saveCart();
    };

    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    category.style.fontStyle = 'italic';
    category.style.fontSize = '0.9rem';
    category.style.marginBottom = '5px';


    card.append(img, title, category, desc, price, addBtn);
    container.appendChild(card);
  });
}

document.querySelectorAll('#category-filter button').forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-category');
    fetch('products.json')
      .then(res => res.json())
      .then(products => {
        const filtered = selected === 'All' ? products : products.filter(p => p.category === selected);
        renderProducts(filtered);
      });
  });
});

console.log("Cart contents:", JSON.parse(localStorage.getItem('cart')));


document.getElementById('cart-toggle').addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.getElementById('cart-modal');
  modal.classList.toggle('show');
  document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('show');
});

document.getElementById('search-box').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

});

loadProducts();
renderCart();
updateCartCount();

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('active');
});

