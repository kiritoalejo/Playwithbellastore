// Fetch products from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to display products on the index page
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear any existing products

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>SKU: ${product.sku}</p>
            <p>Code: ${product.code}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart button count
    document.getElementById('cartButton').innerText = `🛒 View Cart (${cart.length})`;
}

// Function to show the cart modal
function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    document.getElementById('cartModal').style.display = 'block'; // Show the modal
}

// Function to close the cart modal
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none'; // Hide the modal
});

// Function to handle checkout (you can implement a custom action here)
document.getElementById('checkoutButton').addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // Here you can implement checkout functionality, e.g., redirect to a checkout page
});

// Remove product from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart button count
    document.getElementById('cartButton').innerText = `🛒 View Cart (${cart.length})`;

    // Refresh the cart modal view
    showCart();
}

// Initial display of products
displayProducts();

// Update the cart button text
const cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cartButton').innerText = `🛒 View Cart (${cart.length})`;

// Event listener for cart button
document.getElementById('cartButton').addEventListener('click', showCart);
