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


function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");

}


function cargarCarrito() {

    const carritoGuardado =
        localStorage.getItem("carrito");


    if (!carritoGuardado) {

        return [];

    }


    try {

        const carrito =
            JSON.parse(carritoGuardado);


        if (Array.isArray(carrito)) {

            return carrito;

        }

    } catch (error) {

        console.error(
            "Error al cargar carrito:",
            error
        );

    }


    return [];

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


function agregarAlCarrito(codigo) {

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


    if (Number(producto.stock) <= 0) {

        alert(
            "Este producto no tiene stock disponible."
        );

        return;

    }


    const carrito =
        cargarCarrito();


    const productoCarrito =
        carrito.find(function(item) {

            return item.codigo === codigo;

        });


    if (productoCarrito) {

        if (
            productoCarrito.cantidad >=
            Number(producto.stock)
        ) {

            alert(
                "No puedes agregar más unidades de este producto."
            );

            return;

        }


        productoCarrito.cantidad++;

    } else {

        carrito.push({

            codigo: producto.codigo,

            nombre: producto.nombre,

            precio: Number(producto.precio),

            cantidad: 1,

            imagen: producto.imagen || ""

        });

    }


    guardarCarrito(carrito);


    alert(
        producto.nombre +
        " fue agregado al carrito."
    );


    mostrarProductos(
        obtenerProductosFiltrados()
    );

}


function mostrarProductos(productos) {

    const contenedor =
        document.getElementById(
            "lista-productos"
        );


    const mensaje =
        document.getElementById(
            "mensaje-sin-productos"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML = "";


    if (productos.length === 0) {

        if (mensaje) {

            mensaje.style.display = "block";

        }

        return;

    }


    if (mensaje) {

        mensaje.style.display = "none";

    }


    productos.forEach(function(producto) {

        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "tarjeta-producto"
        );


        const stock =
            Number(producto.stock);


        let estadoStock = "";


        if (stock === 0) {

            estadoStock = `
                <p class="estado-sin-stock">
                    Sin stock
                </p>
            `;

        } else if (
            stock <=
            Number(producto.stockCritico || 0)
        ) {

            estadoStock = `
                <p class="estado-stock-critico">
                    Últimas unidades
                </p>
            `;

        } else {

            estadoStock = `
                <p class="estado-stock-disponible">
                    Disponible
                </p>
            `;

        }


        let contenidoImagen = "";


        if (producto.imagen) {

            contenidoImagen = `
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    onerror="this.outerHTML='<div class=&quot;sin-imagen-producto&quot;>Sin imagen</div>'">
            `;

        } else {

            contenidoImagen = `
                <div class="sin-imagen-producto">
                    Sin imagen
                </div>
            `;

        }


        tarjeta.innerHTML = `

            <div class="imagen-contenedor">

                ${contenidoImagen}

            </div>


            <div class="informacion-producto">

                <span class="categoria-producto">

                    ${producto.categoria}

                </span>


                <h3>

                    ${producto.nombre}

                </h3>


                <p class="descripcion-producto">

                    ${producto.descripcion || ""}

                </p>


                <p class="precio-producto">

                    ${formatoPrecio(producto.precio)}

                </p>


                ${estadoStock}


                <button
                    type="button"
                    class="btn-agregar-carrito"
                    data-codigo="${producto.codigo}"
                    ${stock <= 0 ? "disabled" : ""}>

                    ${
                        stock <= 0
                        ? "Sin stock"
                        : "Agregar al carrito"
                    }

                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });


    configurarBotonesCarrito();

}


function configurarBotonesCarrito() {

    const botones =
        document.querySelectorAll(
            ".btn-agregar-carrito"
        );


    botones.forEach(function(boton) {

        boton.addEventListener(
            "click",
            function() {

                const codigo =
                    boton.dataset.codigo;


                agregarAlCarrito(codigo);

            }
        );

    });

}


function obtenerProductosFiltrados() {

    const productos =
        cargarProductos();


    const input =
        document.getElementById(
            "buscar-producto"
        );


    const filtro =
        document.getElementById(
            "filtro-categoria"
        );


    const texto =
        input
            ? input.value
                .trim()
                .toLowerCase()
            : "";


    const categoria =
        filtro
            ? filtro.value
            : "";


    return productos.filter(
        function(producto) {

            const coincideTexto =

                texto === ""

                ||

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
                    .includes(texto);


            const coincideCategoria =

                categoria === ""

                ||

                producto.categoria === categoria;


            return (
                coincideTexto &&
                coincideCategoria
            );

        }
    );

}


function buscarProductos() {

    const resultados =
        obtenerProductosFiltrados();


    mostrarProductos(resultados);

}


function configurarBuscador() {

    const boton =
        document.getElementById(
            "btn-buscar-producto"
        );


    const input =
        document.getElementById(
            "buscar-producto"
        );


    const filtro =
        document.getElementById(
            "filtro-categoria"
        );


    if (boton) {

        boton.addEventListener(
            "click",
            buscarProductos
        );

    }


    if (input) {

        input.addEventListener(
            "input",
            buscarProductos
        );


        input.addEventListener(
            "keydown",
            function(evento) {

                if (evento.key === "Enter") {

                    evento.preventDefault();

                    buscarProductos();

                }

            }
        );

    }


    if (filtro) {

        filtro.addEventListener(
            "change",
            buscarProductos
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const productos =
            cargarProductos();


        mostrarProductos(productos);


        configurarBuscador();

    }
);