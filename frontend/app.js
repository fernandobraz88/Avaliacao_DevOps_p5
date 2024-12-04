document.getElementById("product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);

    if (!name || isNaN(price) || price <= 0) {
        alert("Insira um nome válido e um preço positivo.");
        return;
    }

    const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
        alert("Produto salvo com sucesso!");
        fetchProducts();
        document.getElementById("product-form").reset();
    } else {
        alert("Erro ao salvar o produto.");
    }
});

async function fetchProducts() {
    const response = await fetch("http://localhost:5000/products");
    const products = await response.json();

    const productsList = document.getElementById("products-list");
    productsList.innerHTML = "";

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
                <button onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

async function deleteProduct(id) {
    const response = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("Produto excluído com sucesso!");
        fetchProducts();
    } else {
        alert("Erro ao excluir o produto.");
    }
}

fetchProducts();
