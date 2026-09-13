/* =========================================================
   HUERTOHOGAR - DETALLE DE PRODUCTO
   Lógica de vista individual, selector de cantidad,
   productos recomendados y carrito en LocalStorage
   ========================================================= */

/* =========================================================
   PRODUCTOS INICIALES (SEMILLA OFICIAL DUOC UC)
   ========================================================= */

const productosIniciales = [
    {
        codigo: "FR001",
        nombre: "Manzanas Fuji",
        descripcion: "Manzanas Fuji crujientes, dulces y de excelente calidad cosechadas en el Valle Central.",
        precio: 1200,
        stock: 150,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "../../img/manzanas-fuji.png.png",
        origen: "Valle de Curicó, Región del Maule",
        practicas: "Cultivo tradicional sostenible, sin ceras artificiales."
    },
    {
        codigo: "FR002",
        nombre: "Naranjas Valencia",
        descripcion: "Naranjas Valencia jugosas y llenas de vitamina C, ideales para zumos naturales.",
        precio: 1000,
        stock: 200,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "../../img/naranjas-valencia.png.jpg",
        origen: "Valle de Quillota, Región de Valparaíso",
        practicas: "Riego por goteo eficiente y cosecha manual al punto."
    },
    {
        codigo: "FR003",
        nombre: "Plátanos Cavendish",
        descripcion: "Plátanos Cavendish frescos, dulces y ricos en potasio.",
        precio: 800,
        stock: 250,
        stockCritico: 25,
        categoria: "Frutas Frescas",
        imagen: "../../img/platanos-cavendish.png.jpg",
        origen: "Valles del Norte Chico / Arica",
        practicas: "Maduración natural en planta sin aceleradores químicos."
    },
    {
        codigo: "VR001",
        nombre: "Zanahorias Orgánicas",
        descripcion: "Zanahorias cultivadas de manera 100% orgánica en tierra fértil sin pesticidas.",
        precio: 900,
        stock: 100,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/zanahorias-organicas.png.jpg",
        origen: "Huertos de Melipilla, Región Metropolitana",
        practicas: "Abonos compostados y rotación biológica de cultivos."
    },
    {
        codigo: "VR002",
        nombre: "Espinacas Frescas",
        descripcion: "Espinacas tiernas, frescas y saludables, cosechadas al día.",
        precio: 700,
        stock: 80,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/espinacas-frescas.png.jpg",
        origen: "Casablanca, Región de Valparaíso",
        practicas: "Cosecha matutina para preservar hidratación y clorofila."
    },
    {
        codigo: "VR003",
        nombre: "Pimientos Tricolores",
        descripcion: "Pimientos rojos, amarillos y verdes, aromáticos y crujientes.",
        precio: 1500,
        stock: 120,
        stockCritico: 20,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/pimientos-tricolores.png.jpg",
        origen: "Limache, Región de Valparaíso",
        practicas: "Invernaderos solares con control biológico de plagas."
    },
    {
        codigo: "PO001",
        nombre: "Miel Orgánica",
        descripcion: "Miel multifloral 100% pura y cruda, recolectada en colmenas del sur de Chile.",
        precio: 5000,
        stock: 50,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "../../img/miel-organica.png.jpg",
        origen: "Bosques Nativos de Villarrica, La Araucanía",
        practicas: "Apicultura regenerativa, libre de antibióticos y filtrada en frío."
    },
    {
        codigo: "PO003",
        nombre: "Quinua Orgánica",
        descripcion: "Quinua orgánica andina seleccionada, grano ancestral rico en proteínas.",
        precio: 3500,
        stock: 60,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "../../img/quinua-organica.png.jpg",
        origen: "Secano Costero, Región de O'Higgins",
        practicas: "Secado natural al sol y desaponificado artesanal."
    },
    {
        codigo: "PL001",
        nombre: "Leche Entera",
        descripcion: "Leche entera fresca de libre pastoreo, sin conservantes artificiales.",
        precio: 1200,
        stock: 100,
        stockCritico: 15,
        categoria: "Productos Lácteos",
        imagen: "../../img/leche-entera.png.jpg",
        origen: "Praderas de Osorno y Puerto Montt, Los Lagos",
        practicas: "Vacas de libre pastoreo con bienestar animal garantizado."
    }
];

/* =========================================================
   HELPER DE RUTAS DE IMAGEN
   ========================================================= */

function normalizarRutaImagen(ruta) {
    if (!ruta) return "";
    if (ruta.startsWith("http://") || ruta.startsWith("https://") || ruta.startsWith("data:")) {
        return ruta;
    }
    const nombreArchivo = ruta.split("/").pop();
    return "../../img/" + nombreArchivo;
}

/* =========================================================
   LOCALSTORAGE: PRODUCTOS
   ========================================================= */

function cargarProductos() {
    const productosGuardados = localStorage.getItem("productos");

    if (productosGuardados === null) {
        localStorage.setItem("productos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }

    try {
        const productos = JSON.parse(productosGuardados);
        if (Array.isArray(productos)) {
            return productos;
        }
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }

    return [];
}

/* =========================================================
   LOCALSTORAGE: CARRITO
   ========================================================= */

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (!carritoGuardado) return [];

    try {
        const carrito = JSON.parse(carritoGuardado);
        if (Array.isArray(carrito)) {
            return carrito;
        }
    } catch (error) {
        console.error("Error al cargar carrito:", error);
    }

    return [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================================================
   ACTUALIZAR CONTADOR DEL CARRITO EN EL NAVBAR
   ========================================================= */

function actualizarContadorCarritoNavbar() {
    const cartSpan = document.getElementById("cart-span");
    if (!cartSpan) return;

    const carrito = cargarCarrito();
    const totalUnidades = carrito.reduce(function (acumulador, item) {
        return acumulador + Number(item.cantidad || 0);
    }, 0);

    if (totalUnidades <= 0) {
        cartSpan.textContent = "Carrito";
    } else {
        cartSpan.textContent = totalUnidades === 1 ? "1 ítem" : `${totalUnidades} ítems`;
    }
}

/* =========================================================
   FORMATO DE MONEDA CHILENA
   ========================================================= */

function formatoPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

/* =========================================================
   TOAST NOTIFICACIÓN
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
   RENDERIZAR DETALLE DEL PRODUCTO
   ========================================================= */

let cantidadSeleccionada = 1;
let productoActual = null;

function renderizarDetalleProducto() {
    const contenedor = document.getElementById("contenedor-detalle");
    const mensajeError = document.getElementById("producto-no-encontrado");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id") || params.get("codigo");

    if (!idProducto) {
        contenedor.style.display = "none";
        if (mensajeError) mensajeError.style.display = "block";
        return;
    }

    const productos = cargarProductos();
    productoActual = productos.find(function (p) {
        return p.codigo.toLowerCase() === idProducto.trim().toLowerCase();
    });

    if (!productoActual) {
        contenedor.style.display = "none";
        if (mensajeError) mensajeError.style.display = "block";
        return;
    }

    contenedor.style.display = "grid";
    if (mensajeError) mensajeError.style.display = "none";

    // Actualizar el título de la pestaña en el navegador
    document.title = `${productoActual.nombre} | HuertoHogar`;

    const stock = Number(productoActual.stock);
    let estadoStock = "";

    if (stock <= 0) {
        estadoStock = `<span class="estado-sin-stock">Sin stock disponible</span>`;
    } else if (stock <= Number(productoActual.stockCritico || 0)) {
        estadoStock = `<span class="estado-stock-critico">¡Últimas ${stock} unidades disponibles!</span>`;
    } else {
        estadoStock = `<span class="estado-stock-disponible">En Stock (${stock} unidades disponibles)</span>`;
    }

    const origen = productoActual.origen || "Agricultores locales certificados, Chile";
    const practicas = productoActual.practicas || "100% Cosecha Sostenible sin químicos sintéticos.";
    const rutaImg = normalizarRutaImagen(productoActual.imagen);

    contenedor.innerHTML = `
        <!-- COLUMNA IZQUIERDA: IMAGEN -->
        <div class="detalle-imagen-contenedor">
            <img
                src="${rutaImg}"
                alt="${productoActual.nombre}"
                class="detalle-imagen"
                onerror="this.parentElement.innerHTML='<div style=&quot;padding:40px;color:#999;&quot;>Sin imagen disponible</div>'">
        </div>

        <!-- COLUMNA DERECHA: INFORMACIÓN Y ACCIONES -->
        <div class="detalle-info">
            <span class="categoria-detalle">${productoActual.categoria}</span>
            <h1 class="detalle-titulo">${productoActual.nombre}</h1>
            <p class="detalle-precio">${formatoPrecio(productoActual.precio)}</p>
            <div>${estadoStock}</div>
            
            <p class="detalle-descripcion">
                ${productoActual.descripcion || "Producto fresco cosechado bajo estándares de máxima calidad y pureza."}
            </p>

            <!-- PANEL DE COMPRA -->
            <div class="compra-panel">
                <div class="selector-fila">
                    <label for="cantidad-input">Cantidad:</label>
                    <div class="selector-cantidad">
                        <button type="button" id="btn-menos" class="btn-cantidad" ${stock <= 0 ? "disabled" : ""}>-</button>
                        <input type="number" id="cantidad-input" class="input-cantidad" value="1" min="1" max="${stock}" ${stock <= 0 ? "disabled" : ""}>
                        <button type="button" id="btn-mas" class="btn-cantidad" ${stock <= 0 ? "disabled" : ""}>+</button>
                    </div>
                    <span style="font-size: 0.85rem; color: var(--texto-secundario);">Máx. ${stock} un.</span>
                </div>

                <button
                    type="button"
                    id="btn-agregar-al-carro"
                    class="btn-agregar-detalle"
                    ${stock <= 0 ? "disabled" : ""}>
                    <span>🛒</span>
                    <span>${stock <= 0 ? "Producto Agotado" : "Añadir al Carrito"}</span>
                </button>
            </div>

            <!-- BADGES DE VALOR AGREGADO -->
            <div class="badges-valor">
                <div class="badge-item">
                    <span class="badge-icono">📍</span>
                    <div class="badge-texto">
                        <strong>Origen Local</strong>
                        <span>${origen}</span>
                    </div>
                </div>
                <div class="badge-item">
                    <span class="badge-icono">🌿</span>
                    <div class="badge-texto">
                        <strong>Prácticas Limpias</strong>
                        <span>${practicas}</span>
                    </div>
                </div>
                <div class="badge-item">
                    <span class="badge-icono">🚚</span>
                    <div class="badge-texto">
                        <strong>Despacho Seguro</strong>
                        <span>Cadena de frío garantizada</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    configurarControlesCompra(stock);
    renderizarRecomendados(productos, productoActual);
}

/* =========================================================
   CONFIGURAR CONTROLES DE COMPRA (CANTIDAD Y AGREGAR)
   ========================================================= */

function configurarControlesCompra(stockDisponible) {
    const btnMenos = document.getElementById("btn-menos");
    const btnMas = document.getElementById("btn-mas");
    const inputCantidad = document.getElementById("cantidad-input");
    const btnAgregar = document.getElementById("btn-agregar-al-carro");

    if (stockDisponible <= 0) return;

    cantidadSeleccionada = 1;

    if (btnMenos) {
        btnMenos.addEventListener("click", function () {
            if (cantidadSeleccionada > 1) {
                cantidadSeleccionada--;
                if (inputCantidad) inputCantidad.value = cantidadSeleccionada;
            }
        });
    }

    if (btnMas) {
        btnMas.addEventListener("click", function () {
            if (cantidadSeleccionada < stockDisponible) {
                cantidadSeleccionada++;
                if (inputCantidad) inputCantidad.value = cantidadSeleccionada;
            } else {
                mostrarToast(`Alcanzaste el límite de stock disponible (${stockDisponible}).`, true);
            }
        });
    }

    if (inputCantidad) {
        inputCantidad.addEventListener("change", function () {
            let val = parseInt(inputCantidad.value, 10);
            if (isNaN(val) || val < 1) val = 1;
            if (val > stockDisponible) val = stockDisponible;
            cantidadSeleccionada = val;
            inputCantidad.value = val;
        });
    }

    if (btnAgregar) {
        btnAgregar.addEventListener("click", function () {
            if (!productoActual) return;

            if (stockDisponible <= 0) {
                mostrarToast("Este producto no tiene stock disponible.", true);
                return;
            }

            if (cantidadSeleccionada > stockDisponible) {
                mostrarToast(`Solo puedes agregar hasta ${stockDisponible} unidades disponibles.`, true);
                return;
            }

            const carrito = cargarCarrito();
            const productoEnCarro = carrito.find(function (item) {
                return item.codigo === productoActual.codigo;
            });

            if (productoEnCarro) {
                productoEnCarro.cantidad += cantidadSeleccionada;
            } else {
                carrito.push({
                    codigo: productoActual.codigo,
                    nombre: productoActual.nombre,
                    precio: Number(productoActual.precio),
                    cantidad: cantidadSeleccionada,
                    imagen: normalizarRutaImagen(productoActual.imagen)
                });
            }

            // Descontar del stock en la lista de productos
            const productos = cargarProductos();
            const index = productos.findIndex(function (p) {
                return p.codigo === productoActual.codigo;
            });

            if (index !== -1) {
                productos[index].stock = Math.max(0, Number(productos[index].stock) - cantidadSeleccionada);
                productoActual.stock = productos[index].stock;
                localStorage.setItem("productos", JSON.stringify(productos));
            }

            guardarCarrito(carrito);
            actualizarContadorCarritoNavbar();

            const textoUnidades = cantidadSeleccionada === 1 ? "1 unidad" : `${cantidadSeleccionada} unidades`;
            mostrarToast(`✓ ${textoUnidades} de ${productoActual.nombre} agregadas al carrito (Stock restante: ${productoActual.stock}).`);

            // Re-renderizar el detalle del producto para actualizar stock, badges y botones en tiempo real
            renderizarDetalleProducto();
        });
    }
}

/* =========================================================
   RENDERIZAR SECCIÓN DE PRODUCTOS RECOMENDADOS
   ========================================================= */

function renderizarRecomendados(todosLosProductos, productoExcluido) {
    const seccionRecomendados = document.getElementById("seccion-recomendados");
    if (!seccionRecomendados) return;

    // Filtramos productos distintos al actual
    const otrosProductos = todosLosProductos.filter(function (p) {
        return p.codigo !== productoExcluido.codigo;
    });

    if (otrosProductos.length === 0) {
        seccionRecomendados.innerHTML = "";
        return;
    }

    // Buscamos productos de la misma categoría o complementarios
    const mismaCategoria = otrosProductos.filter(function (p) {
        return p.categoria === productoExcluido.categoria;
    });

    const diferentesCategorias = otrosProductos.filter(function (p) {
        return p.categoria !== productoExcluido.categoria;
    });

    // Combinamos para obtener 3 productos sugeridos
    const recomendados = [...mismaCategoria, ...diferentesCategorias].slice(0, 3);

    let tarjetasHTML = "";
    recomendados.forEach(function (producto) {
        const rutaImg = normalizarRutaImagen(producto.imagen);
        tarjetasHTML += `
            <article class="tarjeta-producto">
                <div class="imagen-contenedor">
                    <img src="${rutaImg}" alt="${producto.nombre}" class="imagen-producto"
                         onerror="this.parentElement.innerHTML='<div class=\\'sin-imagen-producto\\'>Sin imagen</div>'">
                </div>
                <div class="informacion-producto">
                    <span class="categoria-producto">${producto.categoria}</span>
                    <h3>${producto.nombre}</h3>
                    <p class="precio-producto">${formatoPrecio(producto.precio)}</p>
                    <a href="./product-detail.html?id=${producto.codigo}" class="btn-agregar-carrito" style="text-align: center; text-decoration: none;">
                        Ver Detalle
                    </a>
                </div>
            </article>
        `;
    });

    seccionRecomendados.innerHTML = `
        <h2>Productos que también te podrían gustar</h2>
        <p>Completa tu despensa con cosechas frescas y alimentos orgánicos seleccionados.</p>
        <div class="lista-productos" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
            ${tarjetasHTML}
        </div>
    `;
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();
    renderizarDetalleProducto();
});
