const verCarrito = document.getElementById('cartBtn');
const modalHeader = document.createElement("div");
const cartContainer = document.getElementById('cartModal'); 

let isCartVisible = false; // Variable global para rastrear el estado del modal del carrito



// Función para mostrar u ocultar el carrito
function toggleCart() {    

    if (!isCartVisible) {
        showCart(cartContainer);
        isCartVisible = true;
    } else {
        cartContainer.style.display = 'none';
        isCartVisible = false;
    }
}


// Llamada a la función toggleCart() al hacer clic en el botón del carrito
verCarrito.addEventListener('click', toggleCart);

// Función para mostrar el carrito
function showCart(cartContainer) {
    cartContainer.innerHTML = ''; // Limpiar el contenedor del carrito

    let totalPrice = 0;

    // Iterar sobre los elementos en el localStorage y mostrarlos en el carrito
    for (let i = 0; i < localStorage.length; i++) {
        let productId = localStorage.key(i);
        let product = JSON.parse(localStorage.getItem(productId));
        let productTotal = product.price * product.stock;
        totalPrice += productTotal;

        // Crear elemento HTML para mostrar el producto en el carrito
        let productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <div>${product.title}</div>
            <div>Precio: $${product.price.toFixed(2)}</div>
            <div>Cantidad: ${product.stock}</div>
            <div>Total: $${productTotal.toFixed(2)}</div>
            <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
            <button onclick="addQuantity(${product.id})">+</button>
            <button onclick="removeQuantity(${product.id})" ${product.stock === 1 ? 'disabled' : ''}>-</button>
            <button onclick="removeFromCart(${product.id})">Eliminar</button>
            
        `;
        cartContainer.appendChild(productElement);
    }

    // Mostrar el precio total del carrito
    let totalElement = document.createElement('div');
    totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalElement);

    let limpiarCarrito = document.createElement('button'); // Crear un elemento de botón
    limpiarCarrito.classList.add('btn', 'btn-danger'); // Agregar clases de estilo de Bootstrap
    limpiarCarrito.id = 'clearCartButton'; // Asignar un ID único al botón
    limpiarCarrito.textContent = 'Limpiar Carrito'; // Asignar el texto al botón
    
    // Agregar un event listener para llamar a la función clearCart cuando se haga clic en el botón
    limpiarCarrito.addEventListener('click', clearCart);
    
    // Agregar el botón al contenedor del modal
    cartContainer.appendChild(limpiarCarrito);

    let comprarCarrito = document.createElement('button'); // Crear un elemento de botón
    comprarCarrito.classList.add('btn', 'btn-success'); // Agregar clases de estilo de Bootstrap
    comprarCarrito.id = 'buyCartButton'; // Asignar un ID único al botón
    comprarCarrito.textContent = 'Comprar Carrito'; // Asignar el texto al botón    
    // Agregar un event listener para llamar a la función clearCart cuando se haga clic en el botón
    comprarCarrito.addEventListener('click', clearCart);
    cartContainer.appendChild(comprarCarrito);
    

    cartContainer.style.display = 'block'; // Mostrar el modal del carrito
}
