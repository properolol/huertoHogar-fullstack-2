/* =========================================================
   HUERTOHOGAR
   ADMINISTRACIÓN DE PRODUCTOS
   ========================================================= */


/* =========================================================
   PRODUCTOS INICIALES
   ========================================================= */

const productosIniciales = [

    {
        codigo: "FR001",
        nombre: "Manzanas Fuji",
        descripcion: "Manzanas Fuji frescas y de excelente calidad.",
        precio: 1200,
        stock: 150,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "/img/manzanas-fuji.png.png"
    },

    {
        codigo: "FR002",
        nombre: "Naranjas Valencia",
        descripcion: "Naranjas Valencia frescas y jugosas.",
        precio: 1000,
        stock: 200,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "/img/naranjas-valencia.png.jpg"
    },

    {
        codigo: "FR003",
        nombre: "Plátanos Cavendish",
        descripcion: "Plátanos Cavendish frescos.",
        precio: 800,
        stock: 250,
        stockCritico: 25,
        categoria: "Frutas Frescas",
        imagen: "/img/platanos-cavendish.png.jpg"
    },

    {
        codigo: "VR001",
        nombre: "Zanahorias Orgánicas",
        descripcion: "Zanahorias cultivadas de manera orgánica.",
        precio: 900,
        stock: 100,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "/img/zanahorias-organicas.png.jpg"
    },

    {
        codigo: "VR002",
        nombre: "Espinacas Frescas",
        descripcion: "Espinacas frescas y saludables.",
        precio: 700,
        stock: 80,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "/img/espinacas-frescas.png.jpg"
    },

    {
        codigo: "VR003",
        nombre: "Pimientos Tricolores",
        descripcion: "Pimientos rojos, amarillos y verdes.",
        precio: 1500,
        stock: 120,
        stockCritico: 20,
        categoria: "Verduras Orgánicas",
        imagen: "/img/pimientos-tricolores.png.jpg"
    },

    {
        codigo: "PO001",
        nombre: "Miel Orgánica",
        descripcion: "Miel orgánica natural de excelente calidad.",
        precio: 5000,
        stock: 50,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "/img/miel-organica.png.jpg"
    },

    {
        codigo: "PO003",
        nombre: "Quinua Orgánica",
        descripcion: "Quinua orgánica seleccionada.",
        precio: 3500,
        stock: 60,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "/img/quinua-organica.png.jpg"
    },

    {
        codigo: "PL001",
        nombre: "Leche Entera",
        descripcion: "Leche entera fresca.",
        precio: 1200,
        stock: 100,
        stockCritico: 15,
        categoria: "Productos Lácteos",
        imagen: "/img/leche-entera.png.jpg"
    }

];


/* =========================================================
   RUTAS DE IMÁGENES
   ========================================================= */

const imagenesProductos = {

    "FR001": "/img/manzanas-fuji.png.png",

    "FR002": "/img/naranjas-valencia.png.jpg",

    "FR003": "/img/platanos-cavendish.png.jpg",

    "VR001": "/img/zanahorias-organicas.png.jpg",

    "VR002": "/img/espinacas-frescas.png.jpg",

    "VR003": "/img/pimientos-tricolores.png.jpg",

    "PO001": "/img/miel-organica.png.jpg",

    "PO003": "/img/quinua-organica.png.jpg",

    "PL001": "/img/leche-entera.png.jpg"

};


/* =========================================================
   CARGAR PRODUCTOS
   ========================================================= */

function cargarProductos() {

    const productosGuardados =
        localStorage.getItem("productos");


    if (productosGuardados === null) {

        localStorage.setItem(
            "productos",
            JSON.stringify(productosIniciales)
        );

        return productosIniciales;

    }


    try {

        let productos =
            JSON.parse(productosGuardados);


        if (Array.isArray(productos)) {

            productos.forEach(function(producto) {

                if (imagenesProductos[producto.codigo]) {

                    producto.imagen =
                        imagenesProductos[producto.codigo];

                }

            });


            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );


            return productos;

        }

    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );

    }


    localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
    );


    return productosIniciales;

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
   FORMATO DE PRECIO
   ========================================================= */

function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");

}


/* =========================================================
   MOSTRAR PRODUCTOS
   ========================================================= */

function mostrarProductos(listaProductos) {

    const tabla =
        document.getElementById(
            "tabla-productos-body"
        );


    const mensaje =
        document.getElementById(
            "mensaje-sin-productos"
        );


    if (!tabla) {

        return;

    }


    tabla.innerHTML = "";


    if (listaProductos.length === 0) {

        if (mensaje) {

            mensaje.style.display = "block";

        }

        return;

    }


    if (mensaje) {

        mensaje.style.display = "none";

    }


    listaProductos.forEach(function(producto) {

        const fila =
            document.createElement("tr");


        let claseStock = "";


        if (
            Number(producto.stock) <=
            Number(producto.stockCritico)
        ) {

            claseStock = "stock-bajo";

        }


        const rutaImagen =
            producto.imagen ||
            imagenesProductos[producto.codigo] ||
            "";


        let contenidoImagen = "";


        if (rutaImagen !== "") {

            contenidoImagen = `

                <img
                    src="${rutaImagen}"
                    alt="${producto.nombre}"
                    class="imagen-tabla-producto"
                    onerror="this.outerHTML='<span class=&quot;sin-imagen&quot;>Sin imagen</span>'">

            `;

        } else {

            contenidoImagen = `

                <span class="sin-imagen">
                    Sin imagen
                </span>

            `;

        }


        fila.innerHTML = `

            <td class="imagen-producto-admin">

                ${contenidoImagen}

            </td>


            <td>
                ${producto.codigo}
            </td>


            <td>

                <strong>
                    ${producto.nombre}
                </strong>

            </td>


            <td>
                ${producto.categoria}
            </td>


            <td>
                ${formatoPrecio(producto.precio)}
            </td>


            <td class="${claseStock}">
                ${producto.stock}
            </td>


            <td>

                <a
                    href="./edit-product.html?codigo=${encodeURIComponent(producto.codigo)}">

                    Editar

                </a>


                <button
                    type="button"
                    class="btn-eliminar-producto"
                    data-codigo="${producto.codigo}">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });


    agregarEventosEliminar();

}


/* =========================================================
   ELIMINAR PRODUCTO
   ========================================================= */

function eliminarProducto(codigo) {

    const productos =
        cargarProductos();


    const producto =
        productos.find(function(item) {

            return item.codigo === codigo;

        });


    if (!producto) {

        alert(
            "No se encontró el producto."
        );

        return;

    }


    const confirmar =
        confirm(
            "¿Seguro que quieres eliminar \"" +
            producto.nombre +
            "\"?"
        );


    if (!confirmar) {

        return;

    }


    const nuevosProductos =
        productos.filter(function(item) {

            return item.codigo !== codigo;

        });


    guardarProductos(
        nuevosProductos
    );


    mostrarProductos(
        nuevosProductos
    );


    alert(
        "El producto fue eliminado correctamente."
    );

}


/* =========================================================
   EVENTOS DE ELIMINACIÓN
   ========================================================= */

function agregarEventosEliminar() {

    const botones =
        document.querySelectorAll(
            ".btn-eliminar-producto"
        );


    botones.forEach(function(boton) {

        boton.addEventListener(
            "click",
            function() {

                const codigo =
                    boton.dataset.codigo;


                eliminarProducto(codigo);

            }
        );

    });

}


/* =========================================================
   BUSCAR PRODUCTOS
   ========================================================= */

function buscarProductos() {

    const input =
        document.getElementById(
            "buscar-producto"
        );


    if (!input) {

        return;

    }


    const texto =
        input.value
            .trim()
            .toLowerCase();


    const productos =
        cargarProductos();


    if (texto === "") {

        mostrarProductos(productos);

        return;

    }


    const resultados =
        productos.filter(function(producto) {

            return (

                producto.codigo
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.categoria
                    .toLowerCase()
                    .includes(texto)

            );

        });


    mostrarProductos(resultados);

}


/* =========================================================
   CONFIGURAR BUSCADOR
   ========================================================= */

function configurarBuscador() {

    const botonBuscar =
        document.getElementById(
            "btn-buscar-producto"
        );


    const inputBuscar =
        document.getElementById(
            "buscar-producto"
        );


    if (botonBuscar) {

        botonBuscar.addEventListener(
            "click",
            buscarProductos
        );

    }


    if (inputBuscar) {

        inputBuscar.addEventListener(
            "input",
            buscarProductos
        );


        inputBuscar.addEventListener(
            "keydown",
            function(evento) {

                if (evento.key === "Enter") {

                    buscarProductos();

                }

            }
        );

    }

}


/* =========================================================
   INICIAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const productos =
            cargarProductos();


        mostrarProductos(
            productos
        );


        configurarBuscador();

    }
);