//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);

    return carritoParseado;
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    let carritoStringify = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoStringify);
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let liContenedor = elementoClickeado.parentNode;

    let elementoNombre = liContenedor.querySelector(".nombre-producto");
    let elementoPrecio = liContenedor.querySelector(".precio-producto");
    let elementoDescripcion = liContenedor.querySelector(".descripcion-producto");

    let nombreProducto = elementoNombre.textContent;
    let precioProducto = elementoPrecio.textContent;
    let descripcionProducto = elementoDescripcion.textContent;

    // Me fijo si hay algo cargado en el localStorage como "carrito"
    let carritoParseado = obtenerCarrito();
    let flagProductoPreExistente = false;

    if(carritoParseado )
    {
        // --- Ya existe el carrito ---
        for (let element of carritoParseado) 
        {
            if(element.nombre == nombreProducto) // --- Ya existe el producto clickeado
            {
                element.cantidad = element.cantidad + 1;
                flagProductoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        // --- No existe el carrito ---
        carritoParseado = [];

    }

    if(!flagProductoPreExistente)
    {
        let nuevoProducto =
        {
            "nombre" : nombreProducto,
            "precio" : precioProducto,
            "descripcion" : descripcionProducto,
            "cantidad" : 1
        }
        carritoParseado.push(nuevoProducto);
    } 

    guardarCarrito(carritoParseado);

    alert(`${nombreProducto} fue agregado al carrito.`);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let liContenedor = elementoClickeado.parentNode;

    let elementoNombre = liContenedor.querySelector(".nombre-producto");
    let elementoPrecio = liContenedor.querySelector(".precio-producto");
    let elementoDescripcion = liContenedor.querySelector(".descripcion-producto");

    let nombreProducto = elementoNombre.textContent;
    let precioProducto = elementoPrecio.textContent;
    let descripcionProducto = elementoDescripcion.textContent;

    // Me fijo si hay algo cargado en el localStorage como "carrito"
    let carritoParseado = obtenerCarrito();
    let flagProductoPreExistente = false;

    if(carritoParseado )
    {
        // --- Ya existe el carrito ---
        for (let element of carritoParseado) 
        {
            if(element.nombre == nombreProducto) // --- Ya existe el producto clickeado
            {
                element.cantidad = element.cantidad - 1;
                flagProductoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        // --- No existe el carrito ---
        carritoParseado = [];
    }

    if(carritoParseado.length)
    {
        alert("No hay ningún producto en el carrito.");
    }

    if(!flagProductoPreExistente)
    {
        alert(`No hay ningún ${nombreProducto} en el carrito.`);
    }
    else
    {
        carritoParseado = carritoParseado.filter((element) => 
        {
            if(element.cantidad == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        });
    }

    guardarCarrito(carritoParseado);

    alert(`${nombreProducto} fue eliminado del carrito.`);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-agregar-producto");
    const botonesRestar = document.querySelectorAll(".btn-quitar-producto");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
