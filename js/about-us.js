/* =========================================================
   HUERTOHOGAR - QUIÉNES SOMOS (ABOUT US)
   Lógica de interactividad de sucursales, mapa y carrito
   ========================================================= */

/* =========================================================
   DATOS OFICIALES DE SUCURSALES (7 CIUDADES DUOC UC)
   ========================================================= */

const sucursales = [
    {
        id: "santiago",
        ciudad: "Santiago",
        region: "Región Metropolitana",
        tipo: "Casa Matriz y Hub de Distribución",
        direccion: "Av. Providencia 1208, Local 4",
        bodega: "Bodega Central Metropolitana (Capacidad 5.000 kg)",
        horario: "Lunes a Sábado: 08:30 - 20:00 | Domingo: 09:00 - 14:00",
        telefono: "+56 2 2345 6780",
        email: "santiago@huertohogar.cl",
        coordenadas: { x: 50.5, y: 41.2 }, // En el corazón de la Región Metropolitana (verde oscuro)
        ladoEtiqueta: "derecha",
        offsetY: 0,
        icono: "🏢"
    },
    {
        id: "vina-del-mar",
        ciudad: "Viña del Mar",
        region: "Región de Valparaíso",
        tipo: "Sucursal y Tienda Boutique",
        direccion: "Av. Libertad 450, Galería del Parque",
        bodega: "Bodega Costa Norte (Frutas y Hortalizas de Quillota)",
        horario: "Lunes a Sábado: 09:00 - 19:30",
        telefono: "+56 32 254 1122",
        email: "vinadelmar@huertohogar.cl",
        coordenadas: { x: 48.0, y: 38.2 }, // En la costa norte de Valparaíso
        ladoEtiqueta: "izquierda",
        offsetY: -12, // Desplazado arriba para no topar con Valparaíso
        icono: "🌊"
    },
    {
        id: "valparaiso",
        ciudad: "Valparaíso",
        region: "Región de Valparaíso",
        tipo: "Sucursal Tradicional",
        direccion: "Calle Prat 870, Sector Puerto Histórico",
        bodega: "Bodega Cerro Alegre & Cosechas de Casablanca",
        horario: "Lunes a Sábado: 09:00 - 19:00",
        telefono: "+56 32 288 3344",
        email: "valparaiso@huertohogar.cl",
        coordenadas: { x: 47.5, y: 40.0 }, // En la costa sur de Valparaíso
        ladoEtiqueta: "izquierda",
        offsetY: 12, // Desplazado abajo para no topar con Viña del Mar
        icono: "⚓"
    },
    {
        id: "concepcion",
        ciudad: "Concepción",
        region: "Región del Biobío",
        tipo: "Hub Logístico Sur",
        direccion: "Calle Barros Arana 1060, Plaza Independencia",
        bodega: "Centro Logístico Sur Biobío (Cámara de frío)",
        horario: "Lunes a Sábado: 09:00 - 20:00",
        telefono: "+56 41 279 5566",
        email: "concepcion@huertohogar.cl",
        coordenadas: { x: 44.5, y: 52.0 }, // En la costa del Biobío
        ladoEtiqueta: "izquierda",
        offsetY: -4,
        icono: "🏙️"
    },
    {
        id: "nacimiento",
        ciudad: "Nacimiento",
        region: "Región del Biobío",
        tipo: "Centro de Acopio y Tienda Local",
        direccion: "Calle San Martín 320, Centro",
        bodega: "Bodega Agroforestal Biobío (Enlace pequeños agricultores)",
        horario: "Lunes a Viernes: 08:30 - 18:30 | Sábado: 09:00 - 14:00",
        telefono: "+56 43 251 8890",
        email: "nacimiento@huertohogar.cl",
        coordenadas: { x: 47.0, y: 54.5 }, // En el interior del Biobío
        ladoEtiqueta: "derecha",
        offsetY: 6,
        icono: "🌲"
    },
    {
        id: "villarrica",
        ciudad: "Villarrica",
        region: "Región de La Araucanía",
        tipo: "Tienda y Punto de Origen Orgánico",
        direccion: "Av. Pedro de Valdivia 610",
        bodega: "Bodega Lacustre & Cosecha de Mieles Nativas Puras",
        horario: "Lunes a Sábado: 09:30 - 19:00",
        telefono: "+56 45 241 7733",
        email: "villarrica@huertohogar.cl",
        coordenadas: { x: 46.5, y: 60.0 }, // En el territorio verde de La Araucanía
        ladoEtiqueta: "derecha",
        offsetY: 0,
        icono: "🌋"
    },
    {
        id: "puerto-montt",
        ciudad: "Puerto Montt",
        region: "Región de Los Lagos",
        tipo: "Sucursal Austral",
        direccion: "Av. Diego Portales 980, Costanera",
        bodega: "Bodega Praderas Australes & Red de Lácteos de Libre Pastoreo",
        horario: "Lunes a Sábado: 09:00 - 19:30",
        telefono: "+56 65 228 9911",
        email: "puertomontt@huertohogar.cl",
        coordenadas: { x: 46.0, y: 66.0 }, // En la entrada del Seno de Reloncaví
        ladoEtiqueta: "izquierda",
        offsetY: 0,
        icono: "🏔️"
    }
];

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
   INTERACTIVIDAD DE SUCURSALES Y MAPA
   ========================================================= */

let sucursalSeleccionadaId = "santiago";

function renderizarBotonesSucursales() {
    const contenedor = document.getElementById("botones-sucursales");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    sucursales.forEach(function (sucursal) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.classList.add("btn-sucursal-filtro");
        if (sucursal.id === sucursalSeleccionadaId) {
            boton.classList.add("activo");
        }
        boton.innerHTML = `<span>${sucursal.icono}</span> ${sucursal.ciudad}`;
        boton.addEventListener("click", function () {
            seleccionarSucursal(sucursal.id);
        });

        contenedor.appendChild(boton);
    });
}

function renderizarMarcadoresMapa() {
    const mapa = document.getElementById("mapa-pines-contenedor");
    if (!mapa) return;

    mapa.innerHTML = "";

    sucursales.forEach(function (sucursal) {
        const pin = document.createElement("button");
        pin.type = "button";
        const claseLado = sucursal.ladoEtiqueta === "izquierda" ? "pin-izquierda" : "pin-derecha";
        pin.className = `mapa-pin ${claseLado}`;
        pin.setAttribute("data-id", sucursal.id);
        pin.setAttribute("title", `${sucursal.ciudad} - ${sucursal.tipo}`);
        pin.style.left = `${sucursal.coordenadas.x}%`;
        pin.style.top = `${sucursal.coordenadas.y}%`;

        if (sucursal.id === sucursalSeleccionadaId) {
            pin.classList.add("activo");
        }

        const offsetTransform = sucursal.offsetY ? `transform: translateY(calc(-50% + ${sucursal.offsetY}px));` : "";

        pin.innerHTML = `
            <span class="pin-punto"></span>
            <div class="pin-callout ${claseLado}" style="${offsetTransform}">
                <span class="pin-linea"></span>
                <span class="pin-etiqueta">${sucursal.ciudad}</span>
            </div>
        `;

        pin.addEventListener("click", function () {
            seleccionarSucursal(sucursal.id);
        });

        mapa.appendChild(pin);
    });
}

function actualizarFichaSucursal(sucursal) {
    const ficha = document.getElementById("ficha-sucursal-activa");
    if (!ficha || !sucursal) return;

    ficha.classList.remove("fade-in");
    void ficha.offsetWidth; // Forzar reflow para reiniciar animación
    ficha.classList.add("fade-in");

    ficha.innerHTML = `
        <div class="ficha-encabezado">
            <span class="ficha-badge-icono">${sucursal.icono}</span>
            <div>
                <span class="ficha-badge-tipo">${sucursal.tipo}</span>
                <h3 class="ficha-titulo">${sucursal.ciudad}</h3>
                <p class="ficha-region">${sucursal.region}</p>
            </div>
        </div>

        <div class="ficha-detalles">
            <div class="ficha-item">
                <span class="ficha-item-icono">📍</span>
                <div>
                    <strong>Dirección de Tienda</strong>
                    <p>${sucursal.direccion}</p>
                </div>
            </div>

            <div class="ficha-item">
                <span class="ficha-item-icono">📦</span>
                <div>
                    <strong>Capacidad & Bodega Local</strong>
                    <p>${sucursal.bodega}</p>
                </div>
            </div>

            <div class="ficha-item">
                <span class="ficha-item-icono">⏰</span>
                <div>
                    <strong>Horario de Atención</strong>
                    <p>${sucursal.horario}</p>
                </div>
            </div>

            <div class="ficha-item">
                <span class="ficha-item-icono">📞</span>
                <div>
                    <strong>Contacto Directo</strong>
                    <p>${sucursal.telefono} &bull; <a href="mailto:${sucursal.email}" style="color: var(--verde-principal); text-decoration: underline;">${sucursal.email}</a></p>
                </div>
            </div>
        </div>

        <div class="ficha-acciones">
            <a href="https://maps.google.com/?q=HuertoHogar+${encodeURIComponent(sucursal.ciudad + ', ' + sucursal.direccion)}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn-como-llegar">
               🗺️ Cómo llegar en Google Maps ➔
            </a>
            <a href="./product/products.html" class="btn-comprar-sucursal">
               🛒 Ver productos disponibles
            </a>
        </div>
    `;
}

function seleccionarSucursal(id) {
    sucursalSeleccionadaId = id;
    const sucursal = sucursales.find(function (s) {
        return s.id === id;
    });

    // Actualizar botones
    const botones = document.querySelectorAll(".btn-sucursal-filtro");
    botones.forEach(function (btn) {
        if (btn.textContent.includes(sucursal.ciudad)) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });

    // Actualizar pines
    const pines = document.querySelectorAll(".mapa-pin");
    pines.forEach(function (pin) {
        if (pin.getAttribute("data-id") === id) {
            pin.classList.add("activo");
        } else {
            pin.classList.remove("activo");
        }
    });

    actualizarFichaSucursal(sucursal);
}

function renderizarDirectorioCompleto() {
    const contenedor = document.getElementById("grilla-todas-sucursales");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    sucursales.forEach(function (sucursal) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-directorio-sucursal");
        tarjeta.innerHTML = `
            <div class="tarjeta-dir-encabezado">
                <span class="tarjeta-dir-icono">${sucursal.icono}</span>
                <div>
                    <h4>${sucursal.ciudad}</h4>
                    <span class="tarjeta-dir-region">${sucursal.region}</span>
                </div>
            </div>
            <p class="tarjeta-dir-direccion">📍 ${sucursal.direccion}</p>
            <p class="tarjeta-dir-horario">⏰ ${sucursal.horario}</p>
            <p class="tarjeta-dir-telefono">📞 ${sucursal.telefono}</p>
            <button type="button" class="btn-ver-en-mapa" data-id="${sucursal.id}">
                Ver en el mapa interactivo ↑
            </button>
        `;

        const btnVer = tarjeta.querySelector(".btn-ver-en-mapa");
        btnVer.addEventListener("click", function () {
            seleccionarSucursal(sucursal.id);
            const mapaSec = document.getElementById("ubicaciones");
            if (mapaSec) {
                mapaSec.scrollIntoView({ behavior: "smooth" });
            }
        });

        contenedor.appendChild(tarjeta);
    });
}

/* =========================================================
   MANEJO DE HASH URL (#valores, #ubicaciones)
   ========================================================= */

function verificarScrollHash() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(function () {
            const elemento = document.querySelector(hash);
            if (elemento) {
                elemento.scrollIntoView({ behavior: "smooth" });
            }
        }, 150);
    }
}

/* =========================================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();
    renderizarBotonesSucursales();
    renderizarMarcadoresMapa();
    actualizarFichaSucursal(sucursales[0]);
    renderizarDirectorioCompleto();
    verificarScrollHash();
});
