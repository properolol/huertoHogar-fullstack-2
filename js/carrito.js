let carrito = [];


/* =========================================================
   LOCALSTORAGE
   ========================================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


function cargarCarrito() {

    const carritoGuardado =
        localStorage.getItem("carrito");


    if (!carritoGuardado) {

        carrito = [];

        return;

    }


    try {

        const datos =
            JSON.parse(carritoGuardado);


        if (Array.isArray(datos)) {

            carrito = datos;

        } else {

            carrito = [];

        }

    } catch (error) {

        console.error(
            "Error al cargar el carrito:",
            error
        );

        carrito = [];

    }

}


/* =========================================================
   PRODUCTOS
   ========================================================= */

function cargarProductos() {

    const productosGuardados =
        localStorage.getItem("productos");


    if (!productosGuardados) {

        return [];

    }


    try {

        const productos =
            JSON.parse(productosGuardados);


        if (Array.isArray(productos)) {

            return productos;

        }

    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );

    }


    return [];

}


/* =========================================================
   FORMATO DE PRECIO
   ========================================================= */

function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");

}


/* =========================================================
   MOSTRAR CARRITO
   ========================================================= */

function mostrarCarrito() {

    const listaCarrito =
        document.getElementById(
            "lista-carrito"
        );


    if (!listaCarrito) {

        return;

    }


    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p>
                Tu carrito está vacío.
            </p>
        `;

        actualizarTotales();
        actualizarCantidadCarrito();

        return;

    }


    const productos =
        cargarProductos();


    carrito.forEach(function(productoCarrito, indice) {

        const productoOriginal =
            productos.find(function(producto) {

                return producto.codigo ===
                    productoCarrito.codigo;

            });


        const stockDisponible =
            productoOriginal
                ? Number(productoOriginal.stock)
                : productoCarrito.cantidad;


        const productoHTML =
            document.createElement("article");


        productoHTML.classList.add(
            "producto-carrito"
        );


        let imagen = "";


        if (productoCarrito.imagen) {

            imagen = `
                <img
                    src="${productoCarrito.imagen}"
                    alt="${productoCarrito.nombre}"
                    onerror="this.style.display='none'">
            `;

        }


        productoHTML.innerHTML = `

            <div class="producto-info">

                ${imagen}

                <div>

                    <h3>
                        ${productoCarrito.nombre}
                    </h3>

                    <p>
                        ${formatoPrecio(productoCarrito.precio)}
                        por unidad
                    </p>

                    <p>
                        Stock disponible:
                        ${stockDisponible}
                    </p>

                </div>

            </div>


            <div class="producto-cantidad">

                <button
                    type="button"
                    onclick="disminuirCantidad(${indice})">

                    −

                </button>


                <span>

                    ${productoCarrito.cantidad}

                </span>


                <button
                    type="button"
                    onclick="aumentarCantidad(${indice})">

                    +

                </button>

            </div>


            <div class="producto-subtotal">

                <p>

                    Subtotal:
                    ${formatoPrecio(
                        productoCarrito.precio *
                        productoCarrito.cantidad
                    )}

                </p>

            </div>


            <button
                type="button"
                class="btn-eliminar"
                onclick="eliminarProducto(${indice})">

                Eliminar

            </button>

        `;


        listaCarrito.appendChild(
            productoHTML
        );

    });


    actualizarTotales();

    actualizarCantidadCarrito();

}


/* =========================================================
   AUMENTAR CANTIDAD
   ========================================================= */

function aumentarCantidad(indice) {

    const producto =
        carrito[indice];


    if (!producto) {

        return;

    }


    const productos =
        cargarProductos();


    const productoOriginal =
        productos.find(function(item) {

            return item.codigo ===
                producto.codigo;

        });


    const stockDisponible =
        productoOriginal
            ? Number(productoOriginal.stock)
            : 999999;


    if (
        producto.cantidad >=
        stockDisponible
    ) {

        alert(
            "No puedes agregar más unidades de " +
            producto.nombre +
            ". Stock disponible: " +
            stockDisponible
        );

        return;

    }


    producto.cantidad++;


    guardarCarrito();

    mostrarCarrito();

}


/* =========================================================
   DISMINUIR CANTIDAD
   ========================================================= */

function disminuirCantidad(indice) {

    const producto =
        carrito[indice];


    if (!producto) {

        return;

    }


    if (producto.cantidad > 1) {

        producto.cantidad--;

    } else {

        carrito.splice(
            indice,
            1
        );

    }


    guardarCarrito();

    mostrarCarrito();

}


/* =========================================================
   ELIMINAR PRODUCTO
   ========================================================= */

function eliminarProducto(indice) {

    const producto =
        carrito[indice];


    if (!producto) {

        return;

    }


    const confirmar =
        confirm(
            "¿Quieres eliminar \"" +
            producto.nombre +
            "\" del carrito?"
        );


    if (!confirmar) {

        return;

    }


    carrito.splice(
        indice,
        1
    );


    guardarCarrito();

    mostrarCarrito();

}


/* =========================================================
   CALCULAR SUBTOTAL
   ========================================================= */

function calcularSubtotal() {

    return carrito.reduce(
        function(total, producto) {

            return total +
                (
                    Number(producto.precio) *
                    Number(producto.cantidad)
                );

        },
        0
    );

}


/* =========================================================
   ACTUALIZAR TOTALES
   ========================================================= */

function actualizarTotales() {

    const subtotal =
        calcularSubtotal();


    const iva =
        subtotal * 0.19;


    const total =
        subtotal + iva;


    const elementoSubtotal =
        document.getElementById(
            "subtotal-carrito"
        );


    const elementoIva =
        document.getElementById(
            "iva-carrito"
        );


    const elementoTotal =
        document.getElementById(
            "total-carrito"
        );


    if (elementoSubtotal) {

        elementoSubtotal.textContent =
            formatoPrecio(subtotal);

    }


    if (elementoIva) {

        elementoIva.textContent =
            formatoPrecio(iva);

    }


    if (elementoTotal) {

        elementoTotal.textContent =
            formatoPrecio(total);

    }

}


/* =========================================================
   CANTIDAD DEL CARRITO EN NAVBAR
   ========================================================= */

function actualizarCantidadCarrito() {

    const botonCarrito =
        document.getElementById(
            "cart-button"
        );


    if (!botonCarrito) {

        return;

    }


    const cantidadTotal =
        carrito.reduce(
            function(total, producto) {

                return total +
                    Number(producto.cantidad);

            },
            0
        );


    let contador =
        document.getElementById(
            "contador-carrito"
        );


    if (!contador) {

        contador =
            document.createElement("span");

        contador.id =
            "contador-carrito";


        botonCarrito.appendChild(
            contador
        );

    }


    contador.textContent =
        cantidadTotal;

}


/* =========================================================
   FINALIZAR COMPRA
   ========================================================= */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    const subtotal =
        calcularSubtotal();


    const iva =
        subtotal * 0.19;


    const total =
        subtotal + iva;


    const confirmar =
        confirm(
            "¿Deseas finalizar tu compra por " +
            formatoPrecio(total) +
            "?"
        );


    if (!confirmar) {

        return;

    }


    alert(
        "¡Compra realizada correctamente!\n\n" +
        "Total: " +
        formatoPrecio(total) +
        "\n\n" +
        "Gracias por comprar en HuertoHogar."
    );


    carrito = [];


    guardarCarrito();

    mostrarCarrito();

}


/* =========================================================
   EVENTOS
   ========================================================= */

function configurarFinalizarCompra() {

    const boton =
        document.getElementById(
            "finalizar-compra"
        );


    if (!boton) {

        return;

    }


    boton.addEventListener(
        "click",
        finalizarCompra
    );

}


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        cargarCarrito();

        mostrarCarrito();

        configurarFinalizarCompra();

    }
);