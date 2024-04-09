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

//Bot n finalizar compra/limpiar carrito
function clearCart()
{
    localStorage.clear();
    showCart(cartContainer);    
    
};

//Bot n sumar cantidad
function addQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock++;
    localStorage.setItem(id, JSON.stringify(item));
    showCart(cartContainer); // Llama a showCart para actualizar el contenido del carrito
}

//Bot n restar cantidad
function removeQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock--;
    localStorage.setItem(id, JSON.stringify(item));
    showCart(cartContainer);
}

//Bot n eliminar articulo
function removeFromCart(id)
{
    localStorage.removeItem(id);
    showCart(cartContainer); // Llama a showCart para actualizar el contenido del carrito
}