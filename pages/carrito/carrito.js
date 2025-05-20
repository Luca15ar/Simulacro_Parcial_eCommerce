function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);
    return carritoParseado;
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carritoParseado = obtenerCarrito();

    let acumuladorPrecioFinal = 0;

    if (carritoParseado)
    {
        for (let producto of carritoParseado) 
        {
            //--- Creo la fila ---//
            let fila = document.createElement("tr");
    
            //--- Creo las celdas ---//
            let celdaNombre = document.createElement("td");
            celdaNombre.innerText = producto.nombre;
    
            let celdaCantidad = document.createElement("td");
            celdaCantidad.innerText = producto.cantidad;
    
            let celdaPrecio = document.createElement("td");
            celdaPrecio.innerText = producto.precio;
    
            //--- Agrego las celdas a la fila ---//
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCantidad);
            fila.appendChild(celdaPrecio);
    
            //--- Agrego la fila a la tabla ---//
            tabla.appendChild(fila);

            //--- Guardo en mi acumulador de precio final el precio pasado a Float y eliminando el signo $ del string ---//
            let precioUnitarioLimpio = producto.precio.replace("$","");
            let precioUnitarioFloat = parseFloat(precioUnitarioLimpio);

            let cantidadProductos = parseFloat(producto.cantidad);
            let precioFinalDelProducto = cantidadProductos * precioUnitarioFloat;

            acumuladorPrecioFinal = acumuladorPrecioFinal + precioFinalDelProducto;
        }

        let textoValorFinal = document.getElementById("valor-final");
        textoValorFinal.innerText = `El valor final a pagar es de: $${acumuladorPrecioFinal}`;
    }
    else
    {
        let textoValorFinal = document.getElementById("valor-final");
        textoValorFinal.innerText = `El valor final a pagar es de: $0`;
    }
}

function limpiarCarrito() 
{
    //--- Limpio el carrito (LocalStorage) ---//
    localStorage.removeItem("carrito");
    alert("Carrito limpiado correctamente");
    
    //--- Con la propiedad "style" puedo modificar estilos de un elemento desde JS ---// 
    let tablaCarrito = document.getElementById("tabla-carrito");
    tablaCarrito.style.display = "none";

    let textoValorFinal = document.getElementById("valor-final");
    textoValorFinal.innerText = `El valor final a pagar es de: $0`;
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});