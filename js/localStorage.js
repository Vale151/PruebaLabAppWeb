function addToCart(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(product => {
            product.stock = 1;
            localStorage.setItem(product.id, JSON.stringify(product));
            Swal.fire({
                title: "Producto agregado correctamente!",
                text: "",
                icon: "success"
            });
            productModal.style.display = 'none';
        });
};

//Boton finalizar compra/limpiar carrito
function clearCart()
{
    localStorage.clear();
    showCart(cartContainer);    
    
};

//Boton sumar cantidad
function addQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock++;
    localStorage.setItem(id, JSON.stringify(item));
    showCart(cartContainer); // Llama a showCart para actualizar el contenido del carrito
}

//Boton restar cantidad
function removeQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock--;
    localStorage.setItem(id, JSON.stringify(item));
    showCart(cartContainer);
}

//Boton eliminar articulo
function removeFromCart(id)
{
    localStorage.removeItem(id);
    showCart(cartContainer); // Llama a showCart para actualizar el contenido del carrito
}