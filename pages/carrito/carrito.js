function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);

    return carritoParseado;
}

function cargarProductosCarrito() 
{
    let carritoParseado = obtenerCarrito();

    let precioString = "";
    let precioParseado = 0;
    let precioFinal = 0;
    let acumuladorPrecio = 0;

    let referenciaTabla = document.getElementById("tabla-carrito");

    if(carritoParseado)
    {
        for(const element of carritoParseado) 
        {
            // --- Creo nueva fila --- 
            let nuevaFila = document.createElement("tr");

            // --- Creo las celdas y les asigno sus datos---
            let celdaNombre = document.createElement("td");
            celdaNombre.innerText = element.nombre;

            let celdaCantidad = document.createElement("td");
            celdaCantidad.innerText = element.cantidad;

            let celdaPrecio = document.createElement("td");
            celdaPrecio.innerText = element.precio;

            // --- Agrego como hijas, las celdas a la fila
            nuevaFila.appendChild(celdaNombre);
            nuevaFila.appendChild(celdaCantidad);
            nuevaFila.appendChild(celdaPrecio);

            // --- Agrego la fila final a la tabla
            referenciaTabla.appendChild(nuevaFila);

            precioString = element.precio;
            precioString = precioString.replace("$", "").replace(".","");
            precioParseado = parseFloat(precioString);
            precioFinal = precioParseado * element.cantidad;

            acumuladorPrecio = acumuladorPrecio + precioFinal;
        }

        let textoValorFinal = document.getElementById("valor-final");
        textoValorFinal.innerText = `El valor final a pagar es $${acumuladorPrecio}.`;
    }
    else
    {
        alert("No hay productos en el carrito.");
    }

}

function limpiarCarrito() 
{
    localStorage.removeItem("carrito");
    alert("Carrito eliminado correctamente.")

    let referenciaTabla = document.getElementById("tabla-carrito");
    referenciaTabla.style.display = "none";

    let textoValorFinal = document.getElementById("valor-final");
    textoValorFinal.innerText = `El valor final a pagar es $0.`;
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});