/* =========================================================
   HUERTOHOGAR - CATÁLOGO DEL BLOG
   Lógica interactiva de búsqueda, filtrado por categorías
   y contador reactivo del carrito en LocalStorage
   ========================================================= */

let categoriaSeleccionada = "Todos";
let textoBusqueda = "";

/* =========================================================
   ACTUALIZAR CONTADOR DEL CARRITO EN EL NAVBAR
   ========================================================= */

function actualizarContadorCarritoNavbar() {
    const cartSpan = document.getElementById("cart-span");
    if (!cartSpan) return;

    try {
        const carritoGuardado = localStorage.getItem("carrito");
        if (!carritoGuardado) {
            cartSpan.textContent = "Carrito";
            return;
        }

        const carrito = JSON.parse(carritoGuardado);
        if (!Array.isArray(carrito) || carrito.length === 0) {
            cartSpan.textContent = "Carrito";
            return;
        }

        const totalUnidades = carrito.reduce(function (acumulador, item) {
            return acumulador + Number(item.cantidad || 0);
        }, 0);

        if (totalUnidades <= 0) {
            cartSpan.textContent = "Carrito";
        } else {
            cartSpan.textContent = totalUnidades === 1 ? "1 ítem" : `${totalUnidades} ítems`;
        }
    } catch (error) {
        console.error("Error al actualizar contador de carrito:", error);
        cartSpan.textContent = "Carrito";
    }
}

/* =========================================================
   RENDERIZAR ARTÍCULO DESTACADO
   ========================================================= */

function renderizarArticuloDestacado(articulo) {
    const contenedor = document.getElementById("articulo-destacado-contenedor");
    if (!contenedor) return;

    if (!articulo) {
        contenedor.style.display = "none";
        return;
    }

    contenedor.style.display = "block";
    contenedor.innerHTML = `
        <article class="tarjeta-blog-destacada">
            <div class="destacada-imagen-col">
                <img src="${articulo.imagen}" alt="${articulo.titulo}" class="destacada-imagen">
                <span class="badge-destacado-top">⭐ Nota Destacada</span>
            </div>
            <div class="destacada-info-col">
                <div class="blog-meta-header">
                    <span class="blog-categoria-tag">${articulo.categoria}</span>
                    <span class="blog-tiempo">${articulo.tiempoLectura}</span>
                </div>
                <h2><a href="./blog-detail.html?id=${articulo.id}">${articulo.titulo}</a></h2>
                <p class="destacada-extracto">${articulo.descripcionCorta}</p>
                <div class="destacada-footer">
                    <span class="destacada-autor">✍️ Por ${articulo.autor} &bull; ${articulo.fecha}</span>
                    <a href="./blog-detail.html?id=${articulo.id}" class="btn-leer-destacado">
                        Leer Nota Completa ➔
                    </a>
                </div>
            </div>
        </article>
    `;
}

/* =========================================================
   FILTRAR ARTÍCULOS
   ========================================================= */

function obtenerArticulosFiltrados() {
    return articulosBlog.filter(function (articulo) {
        const coincideCategoria =
            categoriaSeleccionada === "Todos" ||
            articulo.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase();

        const coincideTexto =
            textoBusqueda === "" ||
            articulo.titulo.toLowerCase().includes(textoBusqueda) ||
            articulo.descripcionCorta.toLowerCase().includes(textoBusqueda) ||
            articulo.categoria.toLowerCase().includes(textoBusqueda) ||
            articulo.autor.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideTexto;
    });
}

/* =========================================================
   RENDERIZAR GRILLA DE ARTÍCULOS
   ========================================================= */

function renderizarListaArticulos() {
    const contenedor = document.getElementById("lista-articulos");
    const sinResultados = document.getElementById("mensaje-sin-articulos");
    if (!contenedor) return;

    const articulosFiltrados = obtenerArticulosFiltrados();

    if (articulosFiltrados.length === 0) {
        contenedor.innerHTML = "";
        if (sinResultados) sinResultados.style.display = "block";
        return;
    }

    if (sinResultados) sinResultados.style.display = "none";

    let htmlTarjetas = "";
    articulosFiltrados.forEach(function (articulo) {
        htmlTarjetas += `
            <article class="tarjeta-blog">
                <div class="blog-tarjeta-imagen-box">
                    <img src="${articulo.imagen}" alt="${articulo.titulo}" class="blog-tarjeta-imagen">
                    <span class="blog-categoria-tag flotante">${articulo.categoria}</span>
                </div>
                <div class="blog-tarjeta-cuerpo">
                    <div class="blog-meta-tarjeta">
                        <span>📅 ${articulo.fecha}</span>
                        <span>⏱️ ${articulo.tiempoLectura}</span>
                    </div>
                    <h3><a href="./blog-detail.html?id=${articulo.id}">${articulo.titulo}</a></h3>
                    <p class="blog-tarjeta-extracto">${articulo.descripcionCorta}</p>
                    <div class="blog-tarjeta-footer">
                        <span class="blog-autor-small">Por ${articulo.autor}</span>
                        <a href="./blog-detail.html?id=${articulo.id}" class="btn-leer-tarjeta">
                            Leer más ➔
                        </a>
                    </div>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlTarjetas;
}

/* =========================================================
   CONFIGURAR EVENTOS DE BÚSQUEDA Y CATEGORÍAS
   ========================================================= */

function configurarFiltros() {
    // Buscador en tiempo real
    const inputBuscar = document.getElementById("buscar-blog");
    if (inputBuscar) {
        inputBuscar.addEventListener("input", function (e) {
            textoBusqueda = e.target.value.trim().toLowerCase();
            renderizarListaArticulos();
        });
    }

    // Botones de categoría (Chips)
    const botonesCategorias = document.querySelectorAll(".btn-categoria-chip");
    botonesCategorias.forEach(function (btn) {
        btn.addEventListener("click", function () {
            botonesCategorias.forEach(function (b) {
                b.classList.remove("activo");
            });
            btn.classList.add("activo");

            categoriaSeleccionada = btn.getAttribute("data-categoria") || "Todos";
            renderizarListaArticulos();
        });
    });
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();

    // Renderizar nota destacada (la primera del listado)
    const articuloDestacado = articulosBlog.find(function (a) {
        return a.destacado === true;
    }) || articulosBlog[0];

    renderizarArticuloDestacado(articuloDestacado);

    // Renderizar grilla y configurar listeners
    renderizarListaArticulos();
    configurarFiltros();
});
