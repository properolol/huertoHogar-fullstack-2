/* =========================================================
   HUERTOHOGAR
   EDICIÓN DE PRODUCTOS
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

let productos = [];

let productoActual = null;

let nuevaImagen = null;


/* =========================================================
   ELEMENTOS DEL FORMULARIO
   ========================================================= */

const formulario =
    document.getElementById("form-editar-producto");

const codigoInput =
    document.getElementById("codigo");

const nombreInput =
    document.getElementById("nombre");

const descripcionInput =
    document.getElementById("descripcion");

const precioInput =
    document.getElementById("precio");

const stockInput =
    document.getElementById("stock");

const stockCriticoInput =
    document.getElementById("stock-critico");

const categoriaInput =
    document.getElementById("categoria");

const imagenInput =
    document.getElementById("imagen");

const imagenActual =
    document.getElementById("imagen-actual");

const vistaPrevia =
    document.getElementById("vista-previa-imagen");

const mensajeFormulario =
    document.getElementById("mensaje-formulario");


/* =========================================================
   OBTENER CÓDIGO DESDE LA URL
   ========================================================= */

function obtenerCodigoProducto() {

    const parametros =
        new URLSearchParams(window.location.search);


    return parametros.get("codigo");

}


/* =========================================================
   CARGAR PRODUCTOS DESDE LOCALSTORAGE
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
            "Error al cargar los productos:",
            error
        );

    }


    return [];

}


/* =========================================================
   GUARDAR PRODUCTOS
   ========================================================= */

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}


/* =========================================================
   MOSTRAR MENSAJE
   ========================================================= */

function mostrarMensaje(
    mensaje,
    tipo
) {

    if (!mensajeFormulario) {

        return;

    }


    mensajeFormulario.textContent =
        mensaje;


    mensajeFormulario.className =
        "mensaje-formulario " + tipo;


}


/* =========================================================
   LIMPIAR MENSAJES
   ========================================================= */

function limpiarMensajes() {

    const mensajes =
        document.querySelectorAll(
            ".mensaje-error"
        );


    mensajes.forEach(function(mensaje) {

        mensaje.textContent = "";

    });


    if (mensajeFormulario) {

        mensajeFormulario.textContent = "";

        mensajeFormulario.className =
            "mensaje-formulario";

    }

}


/* =========================================================
   MOSTRAR ERROR EN CAMPO
   ========================================================= */

function mostrarError(
    id,
    mensaje
) {

    const elemento =
        document.getElementById(id);


    if (elemento) {

        elemento.textContent =
            mensaje;

    }

}


/* =========================================================
   CARGAR PRODUCTO
   ========================================================= */

function cargarProducto() {

    const codigo =
        obtenerCodigoProducto();


    if (!codigo) {

        mostrarMensaje(
            "No se indicó qué producto se desea editar.",
            "error"
        );


        return;

    }


    productoActual =
        productos.find(function(producto) {

            return producto.codigo === codigo;

        });


    if (!productoActual) {

        mostrarMensaje(
            "No se encontró el producto seleccionado.",
            "error"
        );


        return;

    }


    /* =====================================================
       RELLENAR FORMULARIO
       ===================================================== */

    codigoInput.value =
        productoActual.codigo || "";


    nombreInput.value =
        productoActual.nombre || "";


    descripcionInput.value =
        productoActual.descripcion || "";


    precioInput.value =
        productoActual.precio ?? "";


    stockInput.value =
        productoActual.stock ?? "";


    stockCriticoInput.value =
        productoActual.stockCritico ?? "";


    categoriaInput.value =
        productoActual.categoria || "";


    /* =====================================================
       MOSTRAR IMAGEN ACTUAL
       ===================================================== */

    mostrarImagenActual();

}


/* =========================================================
   MOSTRAR IMAGEN ACTUAL
   ========================================================= */

function mostrarImagenActual() {

    if (!imagenActual) {

        return;

    }


    imagenActual.innerHTML = "";


    if (
        productoActual &&
        productoActual.imagen
    ) {

        imagenActual.innerHTML = `

            <p>
                Imagen actual
            </p>

            <img
                src="${productoActual.imagen}"
                alt="${productoActual.nombre}"
                class="imagen-previa"
                onerror="this.style.display='none'">

        `;

    } else {

        imagenActual.innerHTML = `

            <p>
                Este producto no tiene una imagen registrada.
            </p>

        `;

    }

}


/* =========================================================
   PREVISUALIZAR NUEVA IMAGEN
   ========================================================= */

function configurarImagen() {

    if (!imagenInput) {

        return;

    }


    imagenInput.addEventListener(
        "change",
        function() {

            const archivo =
                imagenInput.files[0];


            if (!archivo) {

                nuevaImagen = null;

                if (vistaPrevia) {

                    vistaPrevia.innerHTML = "";

                }

                return;

            }


            /* =================================================
               VALIDAR TIPO
               ================================================= */

            if (!archivo.type.startsWith("image/")) {

                mostrarError(
                    "error-imagen",
                    "El archivo seleccionado debe ser una imagen."
                );


                imagenInput.value = "";

                return;

            }


            /* =================================================
               VALIDAR TAMAÑO
               ================================================= */

            const maximo =
                2 * 1024 * 1024;


            if (archivo.size > maximo) {

                mostrarError(
                    "error-imagen",
                    "La imagen no puede superar los 2 MB."
                );


                imagenInput.value = "";

                return;

            }


            mostrarError(
                "error-imagen",
                ""
            );


            const lector =
                new FileReader();


            lector.onload =
                function(evento) {

                    nuevaImagen =
                        evento.target.result;


                    if (vistaPrevia) {

                        vistaPrevia.innerHTML = `

                            <p>
                                Nueva imagen
                            </p>

                            <img
                                src="${nuevaImagen}"
                                alt="Vista previa"
                                class="imagen-previa">

                        `;

                    }

                };


            lector.readAsDataURL(archivo);

        }
    );

}


/* =========================================================
   VALIDAR FORMULARIO
   ========================================================= */

function validarFormulario() {

    limpiarMensajes();


    let valido = true;


    /* =====================================================
       NOMBRE
       ===================================================== */

    const nombre =
        nombreInput.value.trim();


    if (nombre === "") {

        mostrarError(
            "error-nombre",
            "El nombre del producto es obligatorio."
        );


        valido = false;

    } else if (nombre.length > 100) {

        mostrarError(
            "error-nombre",
            "El nombre no puede superar los 100 caracteres."
        );


        valido = false;

    }


    /* =====================================================
       DESCRIPCIÓN
       ===================================================== */

    const descripcion =
        descripcionInput.value.trim();


    if (descripcion.length > 500) {

        mostrarError(
            "error-descripcion",
            "La descripción no puede superar los 500 caracteres."
        );


        valido = false;

    }


    /* =====================================================
       PRECIO
       ===================================================== */

    const precio =
        Number(precioInput.value);


    if (precioInput.value === "") {

        mostrarError(
            "error-precio",
            "El precio es obligatorio."
        );


        valido = false;

    } else if (precio < 0) {

        mostrarError(
            "error-precio",
            "El precio no puede ser negativo."
        );


        valido = false;

    }


    /* =====================================================
       STOCK
       ===================================================== */

    const stock =
        Number(stockInput.value);


    if (stockInput.value === "") {

        mostrarError(
            "error-stock",
            "El stock es obligatorio."
        );


        valido = false;

    } else if (stock < 0) {

        mostrarError(
            "error-stock",
            "El stock no puede ser negativo."
        );


        valido = false;

    } else if (!Number.isInteger(stock)) {

        mostrarError(
            "error-stock",
            "El stock debe ser un número entero."
        );


        valido = false;

    }


    /* =====================================================
       STOCK CRÍTICO
       ===================================================== */

    const stockCritico =
        stockCriticoInput.value === ""
        ? 0
        : Number(stockCriticoInput.value);


    if (
        stockCriticoInput.value !== "" &&
        (
            stockCritico < 0 ||
            !Number.isInteger(stockCritico)
        )
    ) {

        mostrarError(
            "error-stock-critico",
            "El stock crítico debe ser un número entero igual o mayor a 0."
        );


        valido = false;

    }


    /* =====================================================
       CATEGORÍA
       ===================================================== */

    if (categoriaInput.value === "") {

        mostrarError(
            "error-categoria",
            "Debes seleccionar una categoría."
        );


        valido = false;

    }


    return valido;

}


/* =========================================================
   GUARDAR CAMBIOS
   ========================================================= */

function guardarCambios(evento) {

    evento.preventDefault();


    if (!productoActual) {

        mostrarMensaje(
            "No se encontró el producto que deseas modificar.",
            "error"
        );


        return;

    }


    if (!validarFormulario()) {

        mostrarMensaje(
            "Revisa los campos marcados antes de guardar.",
            "error"
        );


        return;

    }


    /* =====================================================
       ACTUALIZAR PRODUCTO
       ===================================================== */

    productoActual.nombre =
        nombreInput.value.trim();


    productoActual.descripcion =
        descripcionInput.value.trim();


    productoActual.precio =
        Number(precioInput.value);


    productoActual.stock =
        Number(stockInput.value);


    productoActual.stockCritico =
        stockCriticoInput.value === ""
        ? 0
        : Number(stockCriticoInput.value);


    productoActual.categoria =
        categoriaInput.value;


    /* =====================================================
       ACTUALIZAR IMAGEN
       ===================================================== */

    if (nuevaImagen) {

        productoActual.imagen =
            nuevaImagen;

    }


    /* =====================================================
       GUARDAR EN LOCALSTORAGE
       ===================================================== */

    guardarProductos();


    mostrarMensaje(
        "Producto actualizado correctamente.",
        "exito"
    );


    /* =====================================================
       VOLVER A ADMINISTRACIÓN
       ===================================================== */

    setTimeout(
        function() {

            window.location.href =
                "./products-admin.html";

        },
        1200
    );

}


/* =========================================================
   INICIALIZAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        productos =
            cargarProductos();


        cargarProducto();


        configurarImagen();


        if (formulario) {

            formulario.addEventListener(
                "submit",
                guardarCambios
            );

        }

    }
);