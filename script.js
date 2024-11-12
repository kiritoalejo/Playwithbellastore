// Function to read and import products from Excel file
function importProducts(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const products = XLSX.utils.sheet_to_json(sheet);

        products.forEach(addProductToTable);
    };
    reader.readAsArrayBuffer(file);
}

// Function to dynamically add each product to the table
function addProductToTable(product) {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.innerHTML = `
        <td>${product.ProductName || ''}</td>
        <td>${product.SKU || ''}</td>
        <td>${product.Code || ''}</td>
        <td>${product.Price || ''}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
}
