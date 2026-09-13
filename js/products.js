/* =========================================================
   HUERTOHOGAR - CATÁLOGO DE PRODUCTOS
   Lógica interactiva, filtrado y carrito en LocalStorage
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
        imagen: "../../img/manzanas-fuji.png.png"
    },
    {
        codigo: "FR002",
        nombre: "Naranjas Valencia",
        descripcion: "Naranjas Valencia jugosas y llenas de vitamina C, ideales para zumos naturales.",
        precio: 1000,
        stock: 200,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "../../img/naranjas-valencia.png.jpg"
    },
    {
        codigo: "FR003",
        nombre: "Plátanos Cavendish",
        descripcion: "Plátanos Cavendish frescos, dulces y ricos en potasio.",
        precio: 800,
        stock: 250,
        stockCritico: 25,
        categoria: "Frutas Frescas",
        imagen: "../../img/platanos-cavendish.png.jpg"
    },
    {
        codigo: "VR001",
        nombre: "Zanahorias Orgánicas",
        descripcion: "Zanahorias cultivadas de manera 100% orgánica en tierra fértil sin pesticidas.",
        precio: 900,
        stock: 100,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/zanahorias-organicas.png.jpg"
    },
    {
        codigo: "VR002",
        nombre: "Espinacas Frescas",
        descripcion: "Espinacas tiernas, frescas y saludables, cosechadas al día.",
        precio: 700,
        stock: 80,
        stockCritico: 15,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/espinacas-frescas.png.jpg"
    },
    {
        codigo: "VR003",
        nombre: "Pimientos Tricolores",
        descripcion: "Pimientos rojos, amarillos y verdes, aromáticos y crujientes.",
        precio: 1500,
        stock: 120,
        stockCritico: 20,
        categoria: "Verduras Orgánicas",
        imagen: "../../img/pimientos-tricolores.png.jpg"
    },
    {
        codigo: "PO001",
        nombre: "Miel Orgánica",
        descripcion: "Miel multifloral 100% pura y cruda, recolectada en colmenas del sur de Chile.",
        precio: 5000,
        stock: 50,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "../../img/miel-organica.png.jpg"
    },
    {
        codigo: "PO003",
        nombre: "Quinua Orgánica",
        descripcion: "Quinua orgánica andina seleccionada, grano ancestral rico en proteínas.",
        precio: 3500,
        stock: 60,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "../../img/quinua-organica.png.jpg"
    },
    {
        codigo: "PL001",
        nombre: "Leche Entera",
        descripcion: "Leche entera fresca de libre pastoreo, sin conservantes artificiales.",
        precio: 1200,
        stock: 100,
        stockCritico: 15,
        categoria: "Productos Lácteos",
        imagen: "../../img/leche-entera.png.jpg"
    }
];

/* =========================================================
   MAPA DE CATEGORÍAS (CÓDIGO URL -> NOMBRE CATEGORÍA)
   ========================================================= */

const MAPA_CATEGORIAS = {
    "ff": "Frutas Frescas",
    "vo": "Verduras Orgánicas",
    "po": "Productos Orgánicos",
    "pl": "Productos Lácteos"
};

/* =========================================================
   HELPER DE RUTAS DE IMAGEN
   ========================================================= */

function normalizarRutaImagen(ruta) {
    if (!ruta) return "";
    if (ruta.startsWith("http://") || ruta.startsWith("https://") || ruta.startsWith("data:")) {
        return ruta;
    }
    // Si viene como /img/... o img/... lo convertimos en ../../img/... para que funcione en file://
    const nombreArchivo = ruta.split("/").pop();
    return "../../img/" + nombreArchivo;
}

/* =========================================================
   GESTIÓN DE LOCALSTORAGE: PRODUCTOS
   Solo inicializa la semilla si no hay nada en localStorage.
   Si el admin agregó o modificó productos, se respetan intactos.
   ========================================================= */

function cargarProductos() {
    const productosGuardados = localStorage.getItem("productos");

    // Solo si no existe nada en localStorage, cargamos los productos por defecto
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
        console.error("Error al cargar productos desde localStorage:", error);
    }

    return [];
}

/* =========================================================
   FORMATO DE MONEDA CHILENA
   ========================================================= */

function formatoPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

/* =========================================================
   GESTIÓN DE LOCALSTORAGE: CARRITO
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
   TOAST NOTIFICACIÓN FEEDBACK
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
    }, 3000);
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
   AGREGAR AL CARRITO (COMPATIBLE CON RAMA DE NACHO)
   ========================================================= */

function agregarAlCarrito(codigo) {
    const productos = cargarProductos();
    const producto = productos.find(function (item) {
        return item.codigo === codigo;
    });

    if (!producto) {
        mostrarToast("No se encontró el producto.", true);
        return;
    }

    if (Number(producto.stock) <= 0) {
        mostrarToast("Este producto no tiene stock disponible.", true);
        return;
    }

    const carrito = cargarCarrito();
    const productoCarrito = carrito.find(function (item) {
        return item.codigo === codigo;
    });

    if (productoCarrito) {
        productoCarrito.cantidad++;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            cantidad: 1,
            imagen: normalizarRutaImagen(producto.imagen)
        });
    }

    // Descontar una unidad del stock del producto
    producto.stock = Number(producto.stock) - 1;

    // Guardar cambios en LocalStorage (productos con nuevo stock y carrito actualizado)
    localStorage.setItem("productos", JSON.stringify(productos));
    guardarCarrito(carrito);

    // Actualizar contador del carrito en el navbar
    actualizarContadorCarritoNavbar();

    // Notificar al usuario con el stock restante
    mostrarToast(`${producto.nombre} agregado al carrito (Stock restante: ${producto.stock}).`);

    // Re-renderizar el catálogo en tiempo real manteniendo filtros y búsqueda
    mostrarProductos(obtenerProductosFiltrados());
}

/* =========================================================
   CÁLCULO DINÁMICO DE COLUMNAS
   Mayor divisor de total (menor o igual a 5) que dé como
   resultado un número no decimal (entero).
   Adaptado a 1 o 2 columnas en teléfonos y tablets.
   ========================================================= */

function calcularColumnasOptimas(total) {
    if (total <= 0) return 1;

    const ancho = window.innerWidth;

    // Teléfonos pequeños o medianos (<= 600px): 1 columna para máxima legibilidad
    if (ancho <= 600) {
        return 1;
    }

    // Tablets o teléfonos en horizontal (601px a 850px): máximo 2 columnas
    if (ancho <= 850) {
        return (total % 2 === 0) ? 2 : (total === 1 ? 1 : 2);
    }

    // Pantallas de escritorio:
    // Mayor divisor de total (menor o igual a 5) que dé como resultado un número no decimal
    const limite = Math.min(5, total);
    for (let d = limite; d >= 1; d--) {
        if (total % d === 0) {
            return d; // Primer divisor exacto que encuentra (el mayor)
        }
    }

    return 1;
}

function aplicarColumnasDinamicas(total) {
    const contenedor = document.getElementById("lista-productos");
    if (!contenedor) return;

    const columnas = calcularColumnasOptimas(total);
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, minmax(0, 1fr))`;
}

/* =========================================================
   RENDERIZADO DE TARJETAS DE PRODUCTOS
   ========================================================= */

function mostrarProductos(productos) {
    const contenedor = document.getElementById("lista-productos");
    const mensaje = document.getElementById("mensaje-sin-productos");

    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        if (mensaje) mensaje.style.display = "block";
        return;
    }

    if (mensaje) mensaje.style.display = "none";

    // Aplicar las columnas óptimas calculadas matemáticamente
    aplicarColumnasDinamicas(productos.length);

    productos.forEach(function (producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const stock = Number(producto.stock);
        let estadoStock = "";

        if (stock === 0) {
            estadoStock = `<p class="estado-sin-stock">Sin stock</p>`;
        } else if (stock <= Number(producto.stockCritico || 0)) {
            estadoStock = `<p class="estado-stock-critico">Últimas ${stock} unidades</p>`;
        } else {
            estadoStock = `<p class="estado-stock-disponible">Disponible (${stock} un.)</p>`;
        }

        const rutaImg = normalizarRutaImagen(producto.imagen);
        let contenidoImagen = "";

        if (rutaImg) {
            contenidoImagen = `
                <img
                    src="${rutaImg}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    onerror="this.parentElement.innerHTML='<div class=\\'sin-imagen-producto\\'>Sin imagen</div>'">
            `;
        } else {
            contenidoImagen = `<div class="sin-imagen-producto">Sin imagen</div>`;
        }

        tarjeta.innerHTML = `
            <div class="imagen-contenedor">
                ${contenidoImagen}
            </div>
            <div class="informacion-producto">
                <span class="categoria-producto">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p class="descripcion-producto">${producto.descripcion || ""}</p>
                <p class="precio-producto">${formatoPrecio(producto.precio)}</p>
                ${estadoStock}
                <div class="acciones-tarjeta">
                    <a href="./product-detail.html?id=${producto.codigo}" class="btn-ver-detalle-catalogo">Ver Detalle</a>
                    <button
                        type="button"
                        class="btn-agregar-carrito-catalogo"
                        data-codigo="${producto.codigo}"
                        ${stock <= 0 ? "disabled" : ""}>
                        ${stock <= 0 ? "Agotado" : "🛒 Añadir"}
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });

    configurarBotonesCarrito();
}

/* =========================================================
   CONFIGURACIÓN DE EVENTOS DE BOTONES
   ========================================================= */

function configurarBotonesCarrito() {
    const botones = document.querySelectorAll(".btn-agregar-carrito-catalogo");
    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const codigo = boton.dataset.codigo;
            agregarAlCarrito(codigo);
        });
    });
}

/* =========================================================
   FILTRADO Y BÚSQUEDA
   ========================================================= */

function obtenerProductosFiltrados() {
    const productos = cargarProductos();
    const input = document.getElementById("buscar-producto");
    const filtro = document.getElementById("filtro-categoria");

    const texto = input ? input.value.trim().toLowerCase() : "";
    const categoria = filtro ? filtro.value : "";

    return productos.filter(function (producto) {
        const coincideTexto =
            texto === "" ||
            producto.codigo.toLowerCase().includes(texto) ||
            producto.nombre.toLowerCase().includes(texto) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(texto)) ||
            producto.categoria.toLowerCase().includes(texto);

        const coincideCategoria =
            categoria === "" ||
            producto.categoria === categoria;

        return coincideTexto && coincideCategoria;
    });
}

function buscarProductos() {
    const resultados = obtenerProductosFiltrados();
    mostrarProductos(resultados);
}

function configurarBuscador() {
    const boton = document.getElementById("btn-buscar-producto");
    const input = document.getElementById("buscar-producto");
    const filtro = document.getElementById("filtro-categoria");

    if (boton) boton.addEventListener("click", buscarProductos);

    if (input) {
        input.addEventListener("input", buscarProductos);
        input.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") {
                evento.preventDefault();
                buscarProductos();
            }
        });
    }

    if (filtro) {
        filtro.addEventListener("change", buscarProductos);
    }
}

/* =========================================================
   FILTRO INICIAL POR URL (DESDE EL HOME)
   ========================================================= */

function aplicarFiltroDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("categoria");

    if (!catParam) return;

    const filtro = document.getElementById("filtro-categoria");
    if (!filtro) return;

    // Si viene como código corto (ff, vo, po, pl), traducimos con MAPA_CATEGORIAS
    const categoriaTraducida = MAPA_CATEGORIAS[catParam.toLowerCase()] || catParam;

    // Buscar si existe la opción en el select
    for (let i = 0; i < filtro.options.length; i++) {
        if (filtro.options[i].value.toLowerCase() === categoriaTraducida.toLowerCase()) {
            filtro.selectedIndex = i;
            break;
        }
    }
}

/* =========================================================
   INICIALIZACIÓN Y EVENTO RESIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();
    aplicarFiltroDesdeURL();
    const productos = obtenerProductosFiltrados();
    mostrarProductos(productos);
    configurarBuscador();

    // Reajustar columnas dinámicamente si el usuario redimensiona la ventana
    window.addEventListener("resize", function () {
        const productosActuales = obtenerProductosFiltrados();
        aplicarColumnasDinamicas(productosActuales.length);
    });
});
