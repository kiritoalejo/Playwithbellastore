let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to update the product list in the admin panel
function displayProducts() {
    const productListAdmin = document.getElementById('productListAdmin');
    productListAdmin.innerHTML = ''; // Clear existing list
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>SKU: ${product.sku}</p>
            <p>Code: ${product.code}</p>
            <p>$${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productListAdmin.appendChild(productItem);
    });
}

// Function to add or edit a product
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSku').value;
    const code = document.getElementById('productCode').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (id) {
        // Edit existing product
        const product = products.find(p => p.id === parseInt(id));
        product.name = name;
        product.sku = sku;
        product.code = code;
        product.price = price;
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            name: name,
            sku: sku,
            code: code,
            price: price
        };
        products.push(newProduct);
    }

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    resetForm();
});

// Function to edit a product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productSku').value = product.sku;
    document.getElementById('productCode').value = product.code;
    document.getElementById('productPrice').value = product.price;
}

// Function to delete a product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Function to reset the form
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
}

// Initial load of products
displayProducts();
