document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('productList');
    const productModal = document.getElementById('productModal');
    const closeModalButton = productModal.querySelector('.close');
    const cartTotal = document.getElementById('cartTotal');

    function displayProducts() {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            let productCardsHTML = '';

            data.forEach(product => {
                // Generar HTML de la tarjeta de producto
                productCardsHTML += `
                    <div class="col-md-3">
                    <div class="card mb-4 d-flex align-items-center justify-content-center border-card">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <h5 class="card-price">$ ${product.price}</h5>
                                <button class="details-btn view-details" data-product-id="${product.id}">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            productList.innerHTML = productCardsHTML;
            const detailButtons = document.querySelectorAll('.view-details');
            detailButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    showProductDetails(productId);
                });
            });
        })
        .catch(error => console.error('Error al obtener la lista de productos:', error));
    }

    // Función para mostrar los detalles del producto en el modal
    function showProductDetails(productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                <h5>${product.title}</h5>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button class="details-btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productModal.style.display = 'block';
        })
        .catch(error => console.error('Error al obtener los detalles del producto:', error));
    }
    
    closeModalButton.addEventListener('click', function() {
        productModal.style.display = 'none';
    });

    displayProducts();
    showCartPrice();
});
