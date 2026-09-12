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


function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");

}


function obtenerEstado(producto) {

    const stock =
        Number(producto.stock);

    const stockCritico =
        Number(producto.stockCritico || 0);


    if (stock === 0) {

        return {
            texto: "Sin stock",
            clase: "sin-stock"
        };

    }


    if (stock <= stockCritico) {

        return {
            texto: "Stock crítico",
            clase: "stock-critico"
        };

    }


    return {
        texto: "Disponible",
        clase: "stock-disponible"
    };

}


function actualizarResumen(productos) {

    const totalProductos =
        productos.length;


    let disponibles = 0;

    let criticos = 0;

    let sinStock = 0;


    productos.forEach(function(producto) {

        const stock =
            Number(producto.stock);

        const stockCritico =
            Number(producto.stockCritico || 0);


        if (stock === 0) {

            sinStock++;

        } else if (stock <= stockCritico) {

            criticos++;

        } else {

            disponibles++;

        }

    });


    document.getElementById(
        "total-productos"
    ).textContent = totalProductos;


    document.getElementById(
        "productos-disponibles"
    ).textContent = disponibles;


    document.getElementById(
        "productos-criticos"
    ).textContent = criticos;


    document.getElementById(
        "productos-sin-stock"
    ).textContent = sinStock;

}


function mostrarInventario(productos) {

    const tabla =
        document.getElementById(
            "tabla-inventario-body"
        );

    const mensaje =
        document.getElementById(
            "mensaje-sin-productos"
        );


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    actualizarResumen(productos);


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

        const fila =
            document.createElement("tr");


        const estado =
            obtenerEstado(producto);


        let rutaImagen =
            producto.imagen || "";


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


            <td class="${estado.clase}">

                ${producto.stock}

            </td>


            <td>

                ${producto.stockCritico || 0}

            </td>


            <td>

                <span class="estado-inventario ${estado.clase}">

                    ${estado.texto}

                </span>

            </td>


            <td>

                <a
                    href="./edit-product.html?codigo=${encodeURIComponent(producto.codigo)}">

                    Editar

                </a>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


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

        mostrarInventario(productos);

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


    mostrarInventario(resultados);

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

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const productos =
            cargarProductos();


        mostrarInventario(productos);


        configurarBuscador();

    }
);