let products = [];

// Fetch products from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    })
    .catch(error => console.error('Error fetching products:', error));

// Display products in the admin panel
function displayProducts() {
    const productListAdmin = document.getElementById('productListAdmin');
    productListAdmin.innerHTML = ''; // Clear the existing list
    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('product-item');
        
        productItem.innerHTML = `
            <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <p><strong>${product.name}</strong></p>
                <p>SKU: ${product.sku}</p>
                <p>Code: ${product.code}</p>
                <p>Price: P${product.price}</p>
            </div>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            <button onclick="editProduct(${product.id})">Edit</button>
        `;
        productListAdmin.appendChild(productItem);
    });
}

// Handle product addition
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSku').value;
    const code = document.getElementById('productCode').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageFile = document.getElementById('productImage').files[0];

    // Convert image to Base64 if available
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                id: products.length + 1,
                name: name,
                sku: sku,
                code: code,
                price: price,
                image: e.target.result // Base64 image data
            };
            products.push(newProduct);
            displayProducts();
            document.getElementById('addProductForm').reset();
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Add product without an image
        const newProduct = {
            id: products.length + 1,
            name: name,
            sku: sku,
            code: code,
            price: price,
            image: 'placeholder.jpg' // Default placeholder image
        };
        products.push(newProduct);
        displayProducts();
        document.getElementById('addProductForm').reset();
    }
});

// Import Excel File
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const productData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Parse the data and add to products array
            productData.slice(1).forEach(row => {
                if (row.length >= 5) { // Assumes image URL in fifth column
                    const [name, sku, code, price, imageUrl] = row;
                    const newProduct = {
                        id: products.length + 1,
                        name: name,
                        sku: sku,
                        code: code,
                        price: parseFloat(price) || 0,
                        image: imageUrl || 'placeholder.jpg'
                    };
                    products.push(newProduct);
                }
            });
            displayProducts();
        };
        reader.readAsArrayBuffer(file);
    }
}

// Delete a product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    displayProducts();
}

// Edit a product
function editProduct(productId) {
    const product = products.find(product => product.id === productId);
    const newName = prompt("Edit product name:", product.name);
    const newSku = prompt("Edit product SKU:", product.sku);
    const newCode = prompt("Edit product code:", product.code);
    const newPrice = parseFloat(prompt("Edit product price:", product.price));
    const newImageUrl = prompt("Edit product image URL:", product.image);

    if (newName) product.name = newName;
    if (newSku) product.sku = newSku;
    if (newCode) product.code = newCode;
    if (newPrice) product.price = newPrice;
    if (newImageUrl) product.image = newImageUrl;

    displayProducts();
}
