/* =========================================================
   HUERTOHOGAR
   NUEVO PRODUCTO
   ========================================================= */


/* =========================================================
   ELEMENTOS DEL FORMULARIO
   ========================================================= */

const formulario = document.getElementById("form-producto");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const stockCritico = document.getElementById("stock-critico");
const categoria = document.getElementById("categoria");
const imagen = document.getElementById("imagen");

const mensajeFormulario =
    document.getElementById("mensaje-formulario");

const vistaPrevia =
    document.getElementById("vista-previa-imagen");


/* =========================================================
   MOSTRAR ERROR
   ========================================================= */

function mostrarError(campo, mensaje) {

    const elementoError =
        document.getElementById("error-" + campo);

    if (elementoError) {

        elementoError.textContent = mensaje;

    }


    const elementoCampo =
        document.getElementById(campo);


    if (elementoCampo) {

        elementoCampo.classList.add("campo-error");

    }

}


/* =========================================================
   LIMPIAR ERROR
   ========================================================= */

function limpiarError(campo) {

    const elementoError =
        document.getElementById("error-" + campo);


    if (elementoError) {

        elementoError.textContent = "";

    }


    const elementoCampo =
        document.getElementById(campo);


    if (elementoCampo) {

        elementoCampo.classList.remove("campo-error");

    }

}


/* =========================================================
   LIMPIAR TODOS LOS ERRORES
   ========================================================= */

function limpiarErrores() {

    limpiarError("codigo");
    limpiarError("nombre");
    limpiarError("descripcion");
    limpiarError("precio");
    limpiarError("stock");
    limpiarError("stock-critico");
    limpiarError("categoria");
    limpiarError("imagen");


    if (mensajeFormulario) {

        mensajeFormulario.textContent = "";

        mensajeFormulario.classList.remove(
            "mensaje-exito",
            "mensaje-error-general"
        );

    }

}


/* =========================================================
   CARGAR PRODUCTOS DESDE LOCALSTORAGE
   ========================================================= */

function obtenerProductos() {

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
   GUARDAR PRODUCTOS
   ========================================================= */

function guardarProductos(productos) {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}


/* =========================================================
   VALIDAR CÓDIGO
   ========================================================= */

function validarCodigo() {

    const valor =
        codigo.value.trim();


    if (valor === "") {

        mostrarError(
            "codigo",
            "El código del producto es obligatorio."
        );

        return false;

    }


    if (valor.length < 3) {

        mostrarError(
            "codigo",
            "El código debe tener al menos 3 caracteres."
        );

        return false;

    }


    const productos =
        obtenerProductos();


    const codigoExiste =
        productos.some(function(producto) {

            return producto.codigo.toLowerCase() ===
                valor.toLowerCase();

        });


    if (codigoExiste) {

        mostrarError(
            "codigo",
            "Ya existe un producto con este código."
        );

        return false;

    }


    limpiarError("codigo");

    return true;

}


/* =========================================================
   VALIDAR NOMBRE
   ========================================================= */

function validarNombre() {

    const valor =
        nombre.value.trim();


    if (valor === "") {

        mostrarError(
            "nombre",
            "El nombre del producto es obligatorio."
        );

        return false;

    }


    if (valor.length > 100) {

        mostrarError(
            "nombre",
            "El nombre no puede superar los 100 caracteres."
        );

        return false;

    }


    limpiarError("nombre");

    return true;

}


/* =========================================================
   VALIDAR DESCRIPCIÓN
   ========================================================= */

function validarDescripcion() {

    const valor =
        descripcion.value.trim();


    if (valor.length > 500) {

        mostrarError(
            "descripcion",
            "La descripción no puede superar los 500 caracteres."
        );

        return false;

    }


    limpiarError("descripcion");

    return true;

}


/* =========================================================
   VALIDAR PRECIO
   ========================================================= */

function validarPrecio() {

    const valor =
        precio.value;


    if (valor === "") {

        mostrarError(
            "precio",
            "El precio es obligatorio."
        );

        return false;

    }


    const numero =
        Number(valor);


    if (isNaN(numero)) {

        mostrarError(
            "precio",
            "Ingresa un precio válido."
        );

        return false;

    }


    if (numero < 0) {

        mostrarError(
            "precio",
            "El precio no puede ser negativo."
        );

        return false;

    }


    limpiarError("precio");

    return true;

}


/* =========================================================
   VALIDAR STOCK
   ========================================================= */

function validarStock() {

    const valor =
        stock.value;


    if (valor === "") {

        mostrarError(
            "stock",
            "El stock es obligatorio."
        );

        return false;

    }


    const numero =
        Number(valor);


    if (isNaN(numero)) {

        mostrarError(
            "stock",
            "Ingresa un stock válido."
        );

        return false;

    }


    if (numero < 0) {

        mostrarError(
            "stock",
            "El stock no puede ser negativo."
        );

        return false;

    }


    if (!Number.isInteger(numero)) {

        mostrarError(
            "stock",
            "El stock debe ser un número entero."
        );

        return false;

    }


    limpiarError("stock");

    return true;

}


/* =========================================================
   VALIDAR STOCK CRÍTICO
   ========================================================= */

function validarStockCritico() {

    const valor =
        stockCritico.value;


    if (valor === "") {

        limpiarError("stock-critico");

        return true;

    }


    const numero =
        Number(valor);


    if (isNaN(numero)) {

        mostrarError(
            "stock-critico",
            "Ingresa un stock crítico válido."
        );

        return false;

    }


    if (numero < 0) {

        mostrarError(
            "stock-critico",
            "El stock crítico no puede ser negativo."
        );

        return false;

    }


    if (!Number.isInteger(numero)) {

        mostrarError(
            "stock-critico",
            "El stock crítico debe ser un número entero."
        );

        return false;

    }


    limpiarError("stock-critico");

    return true;

}


/* =========================================================
   VALIDAR CATEGORÍA
   ========================================================= */

function validarCategoria() {

    const valor =
        categoria.value;


    if (valor === "") {

        mostrarError(
            "categoria",
            "Debes seleccionar una categoría."
        );

        return false;

    }


    limpiarError("categoria");

    return true;

}


/* =========================================================
   VISTA PREVIA DE IMAGEN
   ========================================================= */

imagen.addEventListener(
    "change",
    function() {

        limpiarError("imagen");


        if (!imagen.files.length) {

            vistaPrevia.innerHTML = "";

            return;

        }


        const archivo =
            imagen.files[0];


        if (!archivo.type.startsWith("image/")) {

            mostrarError(
                "imagen",
                "El archivo seleccionado debe ser una imagen."
            );

            imagen.value = "";

            vistaPrevia.innerHTML = "";

            return;

        }


        const lector =
            new FileReader();


        lector.onload =
            function(evento) {

                vistaPrevia.innerHTML = `

                    <img
                        src="${evento.target.result}"
                        alt="Vista previa del producto">

                `;

            };


        lector.readAsDataURL(archivo);

    }
);


/* =========================================================
   VALIDACIÓN EN TIEMPO REAL
   ========================================================= */

codigo.addEventListener(
    "blur",
    validarCodigo
);


nombre.addEventListener(
    "blur",
    validarNombre
);


descripcion.addEventListener(
    "blur",
    validarDescripcion
);


precio.addEventListener(
    "blur",
    validarPrecio
);


stock.addEventListener(
    "blur",
    validarStock
);


stockCritico.addEventListener(
    "blur",
    validarStockCritico
);


categoria.addEventListener(
    "change",
    validarCategoria
);


/* =========================================================
   GUARDAR NUEVO PRODUCTO
   ========================================================= */

formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        limpiarErrores();


        const codigoValido =
            validarCodigo();


        const nombreValido =
            validarNombre();


        const descripcionValida =
            validarDescripcion();


        const precioValido =
            validarPrecio();


        const stockValido =
            validarStock();


        const stockCriticoValido =
            validarStockCritico();


        const categoriaValida =
            validarCategoria();


        const formularioValido =
            codigoValido &&
            nombreValido &&
            descripcionValida &&
            precioValido &&
            stockValido &&
            stockCriticoValido &&
            categoriaValida;


        if (!formularioValido) {

            if (mensajeFormulario) {

                mensajeFormulario.textContent =
                    "Revisa los campos marcados antes de guardar.";

                mensajeFormulario.classList.add(
                    "mensaje-error-general"
                );

            }

            return;

        }


        const productos =
            obtenerProductos();


        let nombreImagen = "";


        if (imagen.files.length > 0) {

            nombreImagen =
                imagen.files[0].name;

        }


        const nuevoProducto = {

            codigo:
                codigo.value.trim(),

            nombre:
                nombre.value.trim(),

            descripcion:
                descripcion.value.trim(),

            precio:
                Number(precio.value),

            stock:
                Number(stock.value),

            stockCritico:
                stockCritico.value === ""
                    ? 0
                    : Number(stockCritico.value),

            categoria:
                categoria.value,

            imagen:
                nombreImagen

        };


        productos.push(
            nuevoProducto
        );


        guardarProductos(
            productos
        );


        if (mensajeFormulario) {

            mensajeFormulario.textContent =
                "Producto guardado correctamente.";

            mensajeFormulario.classList.add(
                "mensaje-exito"
            );

        }


        formulario.reset();

        vistaPrevia.innerHTML = "";


        setTimeout(
            function() {

                window.location.href =
                    "./products-admin.html";

            },
            1000
        );

    }
);