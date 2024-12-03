const form = document.getElementById('productForm');
const productList = document.getElementById('productList');
let editingProductId = null;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const method = editingProductId ? 'PUT' : 'POST';
    const url = editingProductId ? `http://localhost:5000/products/${editingProductId}` : 'http://localhost:5000/products';

    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
        editingProductId = null;
        form.reset();
        loadProducts();
    }
});

async function loadProducts() {
    const response = await fetch('http://localhost:5000/products');
    const products = await response.json();
    productList.innerHTML = products.map(p => `
        <li>
            ${p.name} - $${p.price} 
            <button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">Editar</button>
            <button onclick="deleteProduct(${p.id})">Excluir</button>
        </li>
    `).join('');
}

async function editProduct(id, name, price) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    editingProductId = id;
}

async function deleteProduct(id) {
    const response = await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
        loadProducts();
    }
}

loadProducts();