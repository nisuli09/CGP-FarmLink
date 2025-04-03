// DOM Elements
const productGrid = document.getElementById('productGrid');
const productFormModal = document.getElementById('productFormModal');
const productForm = document.getElementById('productForm');
const openFormBtn = document.getElementById('openFormBtn');
const closeBtn = document.querySelector('.close');
const searchHeader = document.getElementById('searchHeader');
const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
const formTitle = document.getElementById('formTitle');
const cardIdInput = document.getElementById('card_id');
const currentImageContainer = document.getElementById('current-image-container');
const currentImage = document.getElementById('current-image');
const cartCount = document.querySelector('.cart-count');

// Current product being edited
let editingProductId = null;
let currentProductData = null;
let allProducts = []; // Store all products for filtering
let cartItems = []; // Store cart items

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    loadCartFromStorage();
    updateCartCount();
    
    openFormBtn.addEventListener('click', () => openModal());
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === productFormModal) {
            closeModal();
        }
    });
    
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Search functionality
    if (searchHeader) {
        searchHeader.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
    
    // Category filter buttons
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category to filter by
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                displayProducts(allProducts);
            } else {
                filterByCategory(category);
            }
        });
    });
});

// Functions
function openModal(productId = null) {
    productFormModal.style.display = 'block';
    
    if (productId) {
        editingProductId = productId;
        formTitle.textContent = 'Edit Product';
        fillFormWithProductData(productId);
    } else {
        editingProductId = null;
        formTitle.textContent = 'Add New Product';
        productForm.reset();
        // Clear the card_id field explicitly
        if (cardIdInput) {
            cardIdInput.value = '';
        }
        currentImageContainer.classList.add('hidden');
        document.getElementById('image').setAttribute('required', 'required');
    }
}

function closeModal() {
    productFormModal.style.display = 'none';
    editingProductId = null;
    currentProductData = null;
}

async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        allProducts = products; // Store for filtering
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        displayProducts([]);
    }
}

function displayProducts(products) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'No products found. Add some products using the form.';
        productGrid.appendChild(noProductsMessage);
        return;
    }
    
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.card_id);
    card.setAttribute('data-name', product.name);
    card.setAttribute('data-price', product.price);
    card.setAttribute('data-category', product.category || '');
    
    // Format the price
    const formattedPrice = `Rs ${parseFloat(product.price).toFixed(2)}`;
    
    // Create star rating
    const rating = product.rating || 4.8; // Use rating from product if available, otherwise default
    const starsHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>';
    
    // Create image URL from blob or use image URL directly
    let imageUrl;
    if (product.image && typeof product.image === 'string' && product.image.startsWith('data:image')) {
        // It's already a data URL
        imageUrl = product.image;
    } else if (product.image && product.image.data) {
        // Convert Blob data from MySQL to data URL
        const uint8Array = new Uint8Array(product.image.data);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        imageUrl = URL.createObjectURL(blob);
    } else {
        // Fallback image
        imageUrl = 'img/rice.png'; // Updated image path to match your project structure
    }
    
    // Generate random reviews count
    const reviewsCount = Math.floor(Math.random() * 20) + 10;
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.category || 'Rice Product'}</div>
            <div class="product-rating">
                <div class="rating-stars">${starsHTML}</div>
                <div class="product-reviews">${rating} • ${reviewsCount} Reviews</div>
            </div>
            <div class="product-description">${product.description || 'Fresh rice product'}</div>
            <div class="product-price">${formattedPrice}</div>
            <div class="product-buttons">
                <button class="edit-btn" data-id="${product.card_id}">EDIT</button>
                <button class="delete-btn" data-id="${product.card_id}">DELETE</button>
            </div>
        </div>
    `;
    
    // Add event listener for card click to navigate to details page
    card.addEventListener('click', function(e) {
        // Only navigate if not clicking the edit or delete buttons
        if (!e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
            window.location.href = `/product-details.html?id=${product.card_id}`;
        }
    });
    
    // Add event listeners
    card.querySelector('.edit-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click navigation
        openModal(product.card_id);
    });
    
    card.querySelector('.delete-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click navigation
        deleteProduct(product.card_id);
    });
    
    return card;
}

async function fillFormWithProductData(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        
        const product = await response.json();
        currentProductData = product;
        
        // Fill the form fields
        cardIdInput.value = product.card_id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('phone_no').value = product.phone_no || '';
        
        // Handle location field
        const locationInput = document.getElementById('location');
        if (locationInput) {
            locationInput.value = product.location || '';
        }
        
        document.getElementById('description').value = product.description || '';
        document.getElementById('item_details').value = product.item_details || '';
        document.getElementById('category').value = product.category || '';
        
        // Handle stock field directly
        const stockInput = document.getElementById('stock');
        if (stockInput) {
            stockInput.value = product.stock || 1;
        } else {
            // Fallback to quantity if stock doesn't exist
            const quantityInput = document.getElementById('quantity');
            if (quantityInput) {
                quantityInput.value = product.stock || 1;
            }
        }
        
        document.getElementById('days').value = product.days || 1;
        
        // Handle image
        if (product.image) {
            // Display the current image
            currentImageContainer.classList.remove('hidden');
            
            // Create image URL from blob or use image URL directly
            let imageUrl;
            if (typeof product.image === 'string' && product.image.startsWith('data:image')) {
                // It's already a data URL
                imageUrl = product.image;
            } else if (product.image.data) {
                // Convert Blob data from MySQL to data URL
                const uint8Array = new Uint8Array(product.image.data);
                const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                imageUrl = URL.createObjectURL(blob);
            } else {
                imageUrl = 'img/rice.png'; // Updated image path
            }
            
            currentImage.src = imageUrl;
            
            // Make the image field optional when editing
            document.getElementById('image').removeAttribute('required');
        } else {
            currentImageContainer.classList.add('hidden');
            document.getElementById('image').setAttribute('required', 'required');
        }
        
    } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Failed to load product details for editing.');
        closeModal();
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(productForm);
    
    // IMPORTANT: If using quantity field instead of stock, map it correctly
    if (formData.has('quantity') && !formData.has('stock')) {
        const quantity = formData.get('quantity');
        formData.delete('quantity');
        formData.append('stock', quantity);
    }
    
    // Add a default location if not provided
    if (!formData.has('location') || formData.get('location') === '') {
        formData.append('location', 'Local Farm');
    }
    
    // IMPORTANT: Remove card_id when adding a new product (not editing)
    if (!editingProductId) {
        formData.delete('card_id');
    }
    
    // If no new image is provided when editing, remove the image field
    if (editingProductId && document.getElementById('image').files.length === 0) {
        formData.delete('image');
    }
    
    try {
        let response;
        
        if (editingProductId) {
            // Update existing product
            response = await fetch(`/api/products/${editingProductId}`, {
                method: 'PUT',
                body: formData
            });
        } else {
            // Add new product
            response = await fetch('/api/products', {
                method: 'POST',
                body: formData
            });
        }
        
        if (response.ok) {
            const result = await response.json();
            closeModal();
            fetchProducts(); // Refresh the product list
            alert(editingProductId ? 'Product updated successfully!' : 'Product added successfully!');
        } else {
            const errorData = await response.json();
            console.error('Server response:', errorData);
            alert(`Failed to save product: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Error saving product. Please try again.');
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Remove the product card from the UI
            const card = document.querySelector(`.product-card[data-id="${productId}"]`);
            if (card) {
                card.remove();
            }
            
            // Check if there are any products left
            const remainingCards = productGrid.querySelectorAll('.product-card');
            if (remainingCards.length === 0) {
                const noProductsMessage = document.createElement('div');
                noProductsMessage.className = 'no-products-message';
                noProductsMessage.textContent = 'No products found. Add some products using the form.';
                productGrid.appendChild(noProductsMessage);
            }
            
            alert('Product deleted successfully!');
        } else {
            const errorData = await response.json();
            alert(`Failed to delete product: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
    }
}

function filterProducts(searchTerm) {
    if (!searchTerm) {
        displayProducts(allProducts);
        return;
    }
    
    const filteredProducts = allProducts.filter(product => {
        const productName = (product.name || '').toLowerCase();
        const productDescription = (product.description || '').toLowerCase();
        const productCategory = (product.category || '').toLowerCase();
        return productName.includes(searchTerm) || 
               productDescription.includes(searchTerm) ||
               productCategory.includes(searchTerm);
    });
    
    displayProducts(filteredProducts);
}

function filterByCategory(category) {
    if (!category) {
        displayProducts(allProducts);
        return;
    }
    
    const filteredProducts = allProducts.filter(product => 
        product.category && product.category === category
    );
    
    displayProducts(filteredProducts);
    
    // If no products in this category, show message
    if (filteredProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = `No products found in category "${category}".`;
        productGrid.appendChild(noProductsMessage);
    }
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}