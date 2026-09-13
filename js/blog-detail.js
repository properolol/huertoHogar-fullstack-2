/* =========================================================
   HUERTOHOGAR - DETALLE DE ARTÍCULO DEL BLOG
   Lógica de renderizado dinámico, productos relacionados,
   descuento de stock en tiempo real y reactividad de carrito
   ========================================================= */

/* =========================================================
   HELPERS DE LOCALSTORAGE Y PRODUCTOS
   ========================================================= */

const productosPorDefectoBlog = [
    { codigo: "FR001", nombre: "Manzanas Fuji", precio: 1200, stock: 150, stockCritico: 20, categoria: "Frutas Frescas", imagen: "../img/manzanas-fuji.png.png" },
    { codigo: "FR002", nombre: "Naranjas Valencia", precio: 1000, stock: 200, stockCritico: 20, categoria: "Frutas Frescas", imagen: "../img/naranjas-valencia.png.jpg" },
    { codigo: "FR003", nombre: "Plátanos Cavendish", precio: 800, stock: 250, stockCritico: 25, categoria: "Frutas Frescas", imagen: "../img/platanos-cavendish.png.jpg" },
    { codigo: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, stock: 100, stockCritico: 15, categoria: "Verduras Orgánicas", imagen: "../img/zanahorias-organicas.png.jpg" },
    { codigo: "VR002", nombre: "Espinacas Frescas", precio: 700, stock: 80, stockCritico: 15, categoria: "Verduras Orgánicas", imagen: "../img/espinacas-frescas.png.jpg" },
    { codigo: "VR003", nombre: "Pimientos Tricolores", precio: 1500, stock: 120, stockCritico: 20, categoria: "Verduras Orgánicas", imagen: "../img/pimientos-tricolores.png.jpg" },
    { codigo: "PO001", nombre: "Miel Orgánica", precio: 5000, stock: 50, stockCritico: 10, categoria: "Productos Orgánicos", imagen: "../img/miel-organica.png.jpg" },
    { codigo: "PO003", nombre: "Quinua Orgánica", precio: 3500, stock: 60, stockCritico: 10, categoria: "Productos Orgánicos", imagen: "../img/quinua-organica.png.jpg" },
    { codigo: "PL001", nombre: "Leche Entera", precio: 1200, stock: 100, stockCritico: 15, categoria: "Productos Lácteos", imagen: "../img/leche-entera.png.jpg" }
];

function cargarProductos() {
    const guardados = localStorage.getItem("productos");
    if (!guardados) {
        localStorage.setItem("productos", JSON.stringify(productosPorDefectoBlog));
        return JSON.parse(JSON.stringify(productosPorDefectoBlog));
    }
    try {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
        localStorage.setItem("productos", JSON.stringify(productosPorDefectoBlog));
        return JSON.parse(JSON.stringify(productosPorDefectoBlog));
    } catch (e) {
        return productosPorDefectoBlog;
    }
}

function cargarCarrito() {
    const guardados = localStorage.getItem("carrito");
    if (!guardados) return [];
    try {
        const parsed = JSON.parse(guardados);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function formatoPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

function normalizarRutaImagen(ruta) {
    if (!ruta) return "";
    if (ruta.startsWith("http://") || ruta.startsWith("https://") || ruta.startsWith("data:")) {
        return ruta;
    }
    const nombreArchivo = ruta.split("/").pop();
    return "../img/" + nombreArchivo;
}

/* =========================================================
   TOAST FEEDBACK
   ========================================================= */

let toastTimeout = null;
function mostrarToast(mensaje, esError = false) {
    const toast = document.getElementById("toast-notificacion");
    const texto = document.getElementById("toast-texto");
    const icono = document.getElementById("toast-icono");

    if (!toast || !texto) {
        alert(mensaje);
        return;
    }

    texto.textContent = mensaje;
    if (esError) {
        toast.style.backgroundColor = "#B71C1C";
        icono.textContent = "⚠";
    } else {
        toast.style.backgroundColor = "#1B5E20";
        icono.textContent = "✓";
    }

    toast.classList.add("mostrar");
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
        toast.classList.remove("mostrar");
    }, 3200);
}

/* =========================================================
   ACTUALIZAR CONTADOR DEL CARRITO EN EL NAVBAR
   ========================================================= */

function actualizarContadorCarritoNavbar() {
    const cartSpan = document.getElementById("cart-span");
    if (!cartSpan) return;

    const carrito = cargarCarrito();
    const total = carrito.reduce(function (acc, item) {
        return acc + Number(item.cantidad || 0);
    }, 0);

    if (total <= 0) {
        cartSpan.textContent = "Carrito";
    } else {
        cartSpan.textContent = total === 1 ? "1 ítem" : `${total} ítems`;
    }
}

/* =========================================================
   AGREGAR PRODUCTO RELACIONADO AL CARRITO
   (Descuenta stock en LocalStorage inmediatamente)
   ========================================================= */

function agregarProductoRelacionado(codigo) {
    const productos = cargarProductos();
    const producto = productos.find(function (p) {
        return p.codigo === codigo;
    });

    if (!producto) {
        mostrarToast("Producto no encontrado.", true);
        return;
    }

    const stockActual = Number(producto.stock);
    if (stockActual <= 0) {
        mostrarToast("Este producto no tiene stock disponible.", true);
        return;
    }

    const carrito = cargarCarrito();
    const productoEnCarro = carrito.find(function (item) {
        return item.codigo === codigo;
    });

    if (productoEnCarro) {
        productoEnCarro.cantidad++;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            cantidad: 1,
            imagen: normalizarRutaImagen(producto.imagen)
        });
    }

    // Descontar inventario
    producto.stock = stockActual - 1;
    localStorage.setItem("productos", JSON.stringify(productos));
    guardarCarrito(carrito);

    actualizarContadorCarritoNavbar();
    mostrarToast(`${producto.nombre} añadido al carrito (Stock restante: ${producto.stock}).`);

    // Re-renderizar los productos relacionados para actualizar stock y badges
    renderizarProductosRelacionados(articuloActual);
}

/* =========================================================
   RENDERIZAR PRODUCTOS RELACIONADOS MENCIONADOS
   ========================================================= */

function renderizarProductosRelacionados(articulo) {
    const seccion = document.getElementById("productos-relacionados-seccion");
    const contenedor = document.getElementById("lista-productos-relacionados");
    if (!seccion || !contenedor) return;

    if (!articulo || !articulo.productosRelacionados || articulo.productosRelacionados.length === 0) {
        seccion.style.display = "none";
        return;
    }

    const todosLosProductos = cargarProductos();
    const productosFiltrados = todosLosProductos.filter(function (p) {
        return articulo.productosRelacionados.includes(p.codigo);
    });

    if (productosFiltrados.length === 0) {
        seccion.style.display = "none";
        return;
    }

    seccion.style.display = "block";
    contenedor.innerHTML = "";

    productosFiltrados.forEach(function (producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto-relacionado");

        const stock = Number(producto.stock);
        const rutaImg = normalizarRutaImagen(producto.imagen);

        let badgeStock = "";
        if (stock <= 0) {
            badgeStock = `<span class="badge-stock-agotado">Agotado</span>`;
        } else if (stock <= Number(producto.stockCritico || 0)) {
            badgeStock = `<span class="badge-stock-alerta">¡Últimas ${stock} un.!</span>`;
        } else {
            badgeStock = `<span class="badge-stock-ok">Stock: ${stock} un.</span>`;
        }

        tarjeta.innerHTML = `
            <div class="prod-rel-img-box">
                <img src="${rutaImg}" alt="${producto.nombre}" onerror="this.src='../img/logo.ico'">
            </div>
            <div class="prod-rel-info">
                <span class="prod-rel-categoria">${producto.categoria}</span>
                <h4>${producto.nombre}</h4>
                <p class="prod-rel-precio">${formatoPrecio(producto.precio)}</p>
                <div>${badgeStock}</div>
                <div class="prod-rel-acciones">
                    <a href="./product/product-detail.html?id=${producto.codigo}" class="btn-ver-prod-rel">Ver Detalle</a>
                    <button type="button" class="btn-comprar-rel" data-codigo="${producto.codigo}" ${stock <= 0 ? "disabled" : ""}>
                        ${stock <= 0 ? "Agotado" : "🛒 Añadir"}
                    </button>
                </div>
            </div>
        `;

        const btnComprar = tarjeta.querySelector(".btn-comprar-rel");
        if (btnComprar && stock > 0) {
            btnComprar.addEventListener("click", function () {
                agregarProductoRelacionado(producto.codigo);
            });
        }

        contenedor.appendChild(tarjeta);
    });
}

/* =========================================================
   RENDERIZAR ARTÍCULO COMPLETO
   ========================================================= */

let articuloActual = null;

function renderizarDetalleArticulo() {
    const contenedor = document.getElementById("articulo-detalle-contenedor");
    const mensajeError = document.getElementById("articulo-no-encontrado");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    const id = idParam ? parseInt(idParam, 10) : 1; // Por defecto el artículo 1

    articuloActual = articulosBlog.find(function (a) {
        return a.id === id;
    });

    if (!articuloActual) {
        contenedor.style.display = "none";
        if (mensajeError) mensajeError.style.display = "block";
        return;
    }

    contenedor.style.display = "block";
    if (mensajeError) mensajeError.style.display = "none";

    document.title = `${articuloActual.titulo} | Blog HuertoHogar`;

    contenedor.innerHTML = `
        <div class="detalle-cabecera-meta">
            <span class="blog-categoria-tag">${articuloActual.categoria}</span>
            <span class="blog-tiempo">⏱️ ${articuloActual.tiempoLectura}</span>
            <span class="blog-fecha">📅 ${articuloActual.fecha}</span>
        </div>

        <h1 class="detalle-articulo-titulo">${articuloActual.titulo}</h1>

        <div class="detalle-autor-box">
            <div class="autor-avatar-circle">🌱</div>
            <div>
                <strong>${articuloActual.autor}</strong>
                <p>Publicado para la comunidad agroecológica de HuertoHogar</p>
            </div>
        </div>

        <div class="detalle-imagen-principal-box">
            <img src="${articuloActual.imagen}" alt="${articuloActual.titulo}" class="detalle-imagen-principal">
            <p class="detalle-imagen-caption">Alimentación sustentable: la conexión viva entre la tierra chilena y tu mesa.</p>
        </div>

        <div class="detalle-articulo-cuerpo">
            ${articuloActual.contenidoHtml}
        </div>
    `;

    renderizarProductosRelacionados(articuloActual);
    renderizarOtrasNotas(articuloActual.id);
}

/* =========================================================
   RENDERIZAR OTRAS NOTAS SUGERIDAS
   ========================================================= */

function renderizarOtrasNotas(idActual) {
    const contenedor = document.getElementById("otras-notas-grid");
    if (!contenedor) return;

    const otras = articulosBlog.filter(function (a) {
        return a.id !== idActual;
    }).slice(0, 2);

    let html = "";
    otras.forEach(function (nota) {
        html += `
            <article class="tarjeta-otra-nota">
                <img src="${nota.imagen}" alt="${nota.titulo}">
                <div class="otra-nota-info">
                    <span class="blog-categoria-tag">${nota.categoria}</span>
                    <h4><a href="./blog-detail.html?id=${nota.id}">${nota.titulo}</a></h4>
                    <p>${nota.descripcionCorta.slice(0, 95)}...</p>
                    <a href="./blog-detail.html?id=${nota.id}" class="enlace-leer-nota">Leer artículo ➔</a>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = html;
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();
    renderizarDetalleArticulo();
});
