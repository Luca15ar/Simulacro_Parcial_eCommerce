function obtenerCarrito() 
{
    return carritoParseado;
}

function cargarProductosCarrito() 
{
  
}

function limpiarCarrito() 
{
    
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});