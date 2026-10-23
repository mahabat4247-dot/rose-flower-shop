/**
 * Rose Flower Shop - Interactive JavaScript
 * Catalog, Shopping Cart Management, Contact Form, Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Flower Catalog Data
  const flowerProducts = [
    {
      id: 'rose-01',
      name: 'Classic Velvet Crimson Roses',
      category: 'roses',
      price: 65.00,
      description: 'A luxurious dozen of deep crimson long-stemmed roses wrapped in artisanal gold paper.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tag: 'Bestseller'
    },
    {
      id: 'rose-02',
      name: 'Blush Pink Grandeur Roses',
      category: 'roses',
      price: 58.00,
      description: 'Soft blush pink roses paired with silver dollar eucalyptus in an elegant cream arrangement.',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
      tag: 'Popular'
    },
    {
      id: 'tulip-01',
      name: 'Dutch Sunrise Golden Tulips',
      category: 'tulips',
      price: 45.00,
      description: 'Bright golden yellow tulips bringing warmth, joy, and springtime freshness.',
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
      tag: 'Fresh Arrival'
    },
    {
      id: 'peony-01',
      name: 'Pastel Perfection Peonies',
      category: 'peonies',
      price: 78.00,
      description: 'Abundant plush pink peonies blooming with soft fragrance and unmatched grace.',
      image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
      tag: 'Limited'
    },
    {
      id: 'lily-01',
      name: 'Royal Stargazer Lily Bouquet',
      category: 'lilies',
      price: 62.00,
      description: 'Fragrant pink Stargazer lilies complemented by lush greenery and delicate accents.',
      image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
      tag: 'Fragrant'
    },
    {
      id: 'bouquet-01',
      name: 'Monaco Luxury Rose & Peony Bouquet',
      category: 'bouquets',
      price: 95.00,
      description: 'A showstopping combination of white roses, blush peonies, and gold eucalyptus accents.',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
      tag: 'Signature'
    },
    {
      id: 'mixed-01',
      name: 'Botanical Harmony Mixed Arrangement',
      category: 'mixed',
      price: 82.00,
      description: 'An artful mix of seasonal tulips, spray roses, lilies, and vibrant wildflowers.',
      image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80',
      tag: 'Seasonal'
    },
    {
      id: 'tulip-02',
      name: 'Spring Blossom Multi-Tulip Ensemble',
      category: 'tulips',
      price: 48.00,
      description: 'A vibrant blend of pink, purple, and white Dutch tulips hand-tied with silk ribbon.',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
      tag: 'Popular'
    }
  ];

  // Cart State
  let cart = [];

  // DOM Elements
  const catalogGrid = document.getElementById('catalogGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartBtn = document.getElementById('cartBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCount = document.getElementById('cartCount');
  const cartBody = document.getElementById('cartBody');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const toastNotification = document.getElementById('toastNotification');
  const currentYearSpan = document.getElementById('currentYear');

  // Set current year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Load Cart from LocalStorage
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('rose_flower_shop_cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      cart = [];
    }
    updateCartUI();
  };

  // Save Cart to LocalStorage
  const saveCart = () => {
    try {
      localStorage.setItem('rose_flower_shop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  };

  // Render Catalog
  const renderCatalog = (categoryFilter = 'all') => {
    if (!catalogGrid) return;

    catalogGrid.innerHTML = '';
    const filteredProducts = categoryFilter === 'all'
      ? flowerProducts
      : flowerProducts.filter(p => p.category === categoryFilter);

    if (filteredProducts.length === 0) {
      catalogGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No flowers found in this category.</p>';
      return;
    }

    filteredProducts.forEach(product => {
      const card = document.createElement('article');
      card.className = 'flower-card';
      card.innerHTML = `
        <div class="card-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy">
          ${product.tag ? `<span class="badge-tag">${product.tag}</span>` : ''}
        </div>
        <div class="card-content">
          <h3 class="flower-title">${product.name}</h3>
          <p class="flower-desc">${product.description}</p>
          <div class="card-footer">
            <span class="flower-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      catalogGrid.appendChild(card);
    });

    // Attach Add to Cart Event Listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        addToCart(id);
      });
    });
  };

  // Filter Catalog Event Handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const category = btn.getAttribute('data-category');
      renderCatalog(category);
    });
  });

  // Cart Functions
  const addToCart = (productId) => {
    const product = flowerProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
  };

  const updateQuantity = (productId, change) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  };

  const updateCartUI = () => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalCount;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;

    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = '<p class="cart-empty-msg">Your shopping cart is currently empty.</p>';
      return;
    }

    cartBody.innerHTML = '';
    cart.forEach(item => {
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      `;
      cartBody.appendChild(cartItemEl);
    });

    // Attach Event Listeners to cart items
    cartBody.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateQuantity(e.target.getAttribute('data-id'), -1);
      });
    });

    cartBody.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateQuantity(e.target.getAttribute('data-id'), 1);
      });
    });

    cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeFromCart(e.target.getAttribute('data-id'));
      });
    });
  };

  // Cart Drawer Toggle
  const openCart = () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
  };

  const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
  };

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Clear & Checkout Handlers
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      cart = [];
      saveCart();
      updateCartUI();
      showToast('Cart cleared!');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
      }
      showToast('Thank you for your order! We will process it shortly.');
      cart = [];
      saveCart();
      updateCartUI();
      closeCart();
    });
  }

  // Toast Notification
  const showToast = (message) => {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  };

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      formFeedback.textContent = 'Thank you for reaching out! We will reply within 24 hours.';
      formFeedback.className = 'form-feedback success';
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
        formFeedback.className = 'form-feedback';
      }, 5000);
    });
  }

  // Mobile Nav Toggle
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('active');
    });
  }

  // Initialize
  renderCatalog();
  loadCart();
});
