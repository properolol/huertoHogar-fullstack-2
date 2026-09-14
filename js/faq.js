/* =========================================================
   HUERTOHOGAR - PREGUNTAS FRECUENTES (FAQ)
   Lógica interactiva de acordeón, buscador en tiempo real,
   filtrado por categorías y reactividad del carrito
   ========================================================= */

/* =========================================================
   BASE DE DATOS DE PREGUNTAS FRECUENTES
   ========================================================= */

const preguntasFrecuentes = [
    // 1. ENVÍOS Y DESPACHO
    {
        id: 1,
        categoriaId: "envios",
        categoriaNombre: "Envíos & Cobertura",
        categoriaIcono: "🚚",
        pregunta: "¿Cuáles son las zonas de cobertura y tiempos de despacho en Chile?",
        respuesta: `
            <p>Realizamos despachos directos en las 7 ciudades donde contamos con sucursales y centros de distribución:</p>
            <ul>
                <li><strong>Zona Centro:</strong> Santiago (todas las comunas), Viña del Mar y Valparaíso. Entregas en <strong>24 a 48 horas hábiles</strong>.</li>
                <li><strong>Zona Sur:</strong> Concepción, Nacimiento, Villarrica y Puerto Montt. Entregas programadas en <strong>24 a 48 horas</strong> según disponibilidad de ruta campesina.</li>
            </ul>
            <div class="faq-tip-box">
                <span>🌱</span>
                <div><strong>Cosecha al Día:</strong> Los pedidos recibidos antes de las 14:00 hrs se coordinan con las cosechas matutinas del día siguiente para garantizar máxima frescura.</div>
            </div>
        `
    },
    {
        id: 2,
        categoriaId: "envios",
        categoriaNombre: "Envíos & Cobertura",
        categoriaIcono: "🚚",
        pregunta: "¿Cómo garantizan que las verduras y frutas lleguen frescas y sin maltratarse?",
        respuesta: `
            <p>Utilizamos una logística de <strong>cadena corta y transporte acondicionado</strong>. Los vegetales de hoja (como espinacas y lechugas) se transportan con humedad controlada y empaques ventilados biodegradables.</p>
            <p>Además, las frutas delicadas (manzanas, tomates, paltas) se embalan en divisiones individuales de pulpa reciclada para evitar golpes durante el trayecto.</p>
        `
    },
    {
        id: 3,
        categoriaId: "envios",
        categoriaNombre: "Envíos & Cobertura",
        categoriaIcono: "🚚",
        pregunta: "¿Cuál es el costo del despacho a domicilio?",
        respuesta: `
            <p>El costo estándar de envío es de <strong>$2.990</strong> en el radio urbano de nuestras 7 ciudades principales.</p>
            <p><strong>¡Envío Gratis!</strong> Por compras superiores a <strong>$25.000</strong> en cualquier categoría de productos, el despacho a tu hogar es 100% gratuito.</p>
        `
    },

    // 2. PRODUCTOS Y CALIDAD AGROECOLÓGICA
    {
        id: 4,
        categoriaId: "calidad",
        categoriaNombre: "Productos & Calidad",
        categoriaIcono: "🍎",
        pregunta: "¿De dónde provienen exactamente los productos de HuertoHogar?",
        respuesta: `
            <p>Trabajamos en alianza directa con más de <strong>50 familias y cooperativas de pequeños agricultores chilenos</strong> ubicados en valles fértiles como Curicó, Quillota, Melipilla, Limache y la cuenca del Bío Bío.</p>
            <p>Al comprar en HuertoHogar eliminas a los intermediarios abusivos y aseguras que el 70% del valor de cada producto llegue directamente a manos campesinas.</p>
        `
    },
    {
        id: 5,
        categoriaId: "calidad",
        categoriaNombre: "Productos & Calidad",
        categoriaIcono: "🍎",
        pregunta: "¿Los productos son realmente orgánicos y libres de pesticidas?",
        respuesta: `
            <p>Nuestra línea de <strong>Verduras Orgánicas</strong> y <strong>Productos Orgánicos</strong> (miel pura, quinua andina) es cultivada bajo estrictas normas agroecológicas:</p>
            <ul>
                <li>Sin pesticidas ni herbicidas sintéticos.</li>
                <li>Abonados exclusivamente con compost orgánico y humus de lombriz.</li>
                <li>Sin ceras artificiales para abrillantar la piel de las frutas.</li>
            </ul>
        `
    },
    {
        id: 6,
        categoriaId: "calidad",
        categoriaNombre: "Productos & Calidad",
        categoriaIcono: "🍎",
        pregunta: "¿Qué pasa si un producto llega golpeado o no cumple mis expectativas?",
        respuesta: `
            <p>En HuertoHogar respaldamos cada envío con nuestra <strong>Garantía de Frescura Campesina</strong>.</p>
            <p>Si alguna fruta o verdura no llega en perfectas condiciones, escríbenos dentro de las primeras 24 horas enviando una fotografía a nuestro WhatsApp o formulario de contacto. Te repondremos el producto en el siguiente despacho o te reembolsaremos su valor de inmediato.</p>
        `
    },

    // 3. PAGOS, COMPRAS Y STOCK
    {
        id: 7,
        categoriaId: "pagos",
        categoriaNombre: "Pagos & Carrito",
        categoriaIcono: "💳",
        pregunta: "¿Qué medios de pago puedo utilizar en la tienda online?",
        respuesta: `
            <p>Aceptamos los principales métodos de pago seguros de Chile:</p>
            <ul>
                <li><strong>Tarjetas de Débito y Crédito</strong> (Visa, Mastercard, American Express) a través de Webpay Plus y Mercado Pago con cifrado SSL bancario.</li>
                <li><strong>Transferencia Electrónica Bancaria directa</strong> (con confirmación automática inmediata al adjuntar comprobante).</li>
            </ul>
        `
    },
    {
        id: 8,
        categoriaId: "pagos",
        categoriaNombre: "Pagos & Carrito",
        categoriaIcono: "💳",
        pregunta: "¿Cómo funciona el descuento de stock en tiempo real?",
        respuesta: `
            <p>Cada vez que añades un producto desde el catálogo, el detalle o las notas del blog, nuestro sistema sincroniza el inventario disponible en tiempo real.</p>
            <p>Si un producto alcanza el nivel de <em>Stock Crítico</em> se te alertará en la tarjeta ("¡Últimas unidades!"), y si se agota, el botón se desactivará automáticamente para evitar sobreventas.</p>
        `
    },
    {
        id: 9,
        categoriaId: "pagos",
        categoriaNombre: "Pagos & Carrito",
        categoriaIcono: "💳",
        pregunta: "¿Es obligatorio registrarse para comprar?",
        respuesta: `
            <p><strong>No es obligatorio.</strong> Puedes realizar tu pedido en modo invitado ingresando únicamente tus datos de despacho y contacto.</p>
            <p>Sin embargo, registrarte te permite consultar el historial de tus pedidos, repetir compras habituales con un solo clic y guardar tus direcciones favoritas.</p>
        `
    },

    // 4. SOSTENIBILIDAD Y EMPAQUES
    {
        id: 10,
        categoriaId: "sostenibilidad",
        categoriaNombre: "Sostenibilidad & Empaques",
        categoriaIcono: "♻️",
        pregunta: "¿Qué tipo de empaques utilizan para entregar los pedidos?",
        respuesta: `
            <p>Nuestro compromiso con el medio ambiente es absoluto: <strong>cero plásticos de un solo uso</strong>.</p>
            <ul>
                <li>Cajas de cartón kraft 100% reciclable y biodegradable.</li>
                <li>Bolsas de papel vegetal transpirable para tubérculos y legumbres.</li>
                <li>Cintas de embalaje a base de agua y papel reciclado.</li>
            </ul>
        `
    },
    {
        id: 11,
        categoriaId: "sostenibilidad",
        categoriaNombre: "Sostenibilidad & Empaques",
        categoriaIcono: "♻️",
        pregunta: "¿Tienen programa de retorno o reutilización de cajas?",
        respuesta: `
            <p><strong>¡Sí! Fomentamos la economía circular campesina.</strong> Puedes entregarle al repartidor las cajas limpias y en buen estado de tus compras anteriores cuando recibas un nuevo pedido.</p>
            <p>Nosotros las desinfectamos y reutilizamos, reduciendo drásticamente la generación de residuos domiciliarios.</p>
        `
    },

    // 5. TIENDAS FÍSICAS Y ATENCIÓN
    {
        id: 12,
        categoriaId: "sucursales",
        categoriaNombre: "Tiendas Físicas & Soporte",
        categoriaIcono: "📍",
        pregunta: "¿Tienen tiendas físicas donde pueda comprar directamente?",
        respuesta: `
            <p>¡Por supuesto! Contamos con <strong>7 sucursales y puntos de retiro</strong> equipados con bodegas refrigeradas ecológicas en:</p>
            <p><strong>Santiago, Viña del Mar, Valparaíso, Nacimiento, Concepción, Villarrica y Puerto Montt.</strong></p>
            <div class="faq-tip-box">
                <span>🗺️</span>
                <div>Puedes consultar la dirección exacta, horarios de atención y mapa interactivo en nuestra sección <a href="./about-us.html#ubicaciones" style="color: #166534; font-weight: 700; text-decoration: underline;">Quiénes Somos / Sucursales</a>.</div>
            </div>
        `
    },
    {
        id: 13,
        categoriaId: "sucursales",
        categoriaNombre: "Tiendas Físicas & Soporte",
        categoriaIcono: "📍",
        pregunta: "¿Cuáles son los canales de atención si tengo una consulta urgente?",
        respuesta: `
            <p>Nuestro equipo de atención al cliente atiende de lunes a sábado de 08:30 a 19:30 hrs:</p>
            <ul>
                <li><strong>WhatsApp de Ayuda Campesina:</strong> +56 9 8765 4321</li>
                <li><strong>Correo Electrónico:</strong> contacto@huertohogar.cl</li>
                <li><strong>Formulario Web:</strong> En la sección <a href="./contact.html" style="color: #166534; font-weight: 700; text-decoration: underline;">Contacto</a> responderemos tu requerimiento en menos de 2 horas.</li>
            </ul>
        `
    }
];

/* =========================================================
   ESTADO GLOBAL DE LA PÁGINA
   ========================================================= */

let categoriaSeleccionada = "todas";
let textoBusqueda = "";
let todosExpandidos = false;

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
        console.error("Error al actualizar contador del carrito:", error);
        cartSpan.textContent = "Carrito";
    }
}

/* =========================================================
   FILTRAR PREGUNTAS
   ========================================================= */

function obtenerPreguntasFiltradas() {
    const texto = textoBusqueda.trim().toLowerCase();

    return preguntasFrecuentes.filter(function (faq) {
        const coincideCategoria =
            categoriaSeleccionada === "todas" || faq.categoriaId === categoriaSeleccionada;

        const coincideTexto =
            texto === "" ||
            faq.pregunta.toLowerCase().includes(texto) ||
            faq.respuesta.toLowerCase().includes(texto) ||
            faq.categoriaNombre.toLowerCase().includes(texto);

        return coincideCategoria && coincideTexto;
    });
}

/* =========================================================
   RENDERIZAR PREGUNTAS Y ACORDEONES
   ========================================================= */

function renderizarFAQs() {
    const contenedor = document.getElementById("faq-lista-contenedor");
    const bloqueVacio = document.getElementById("faq-vacio");
    const contadorTexto = document.getElementById("faq-contador-texto");
    const btnToggle = document.getElementById("btn-toggle-todos");

    if (!contenedor) return;

    const filtradas = obtenerPreguntasFiltradas();

    // Actualizar contador
    if (contadorTexto) {
        if (filtradas.length === 1) {
            contadorTexto.textContent = "Mostrando 1 pregunta frecuente";
        } else {
            contadorTexto.textContent = `Mostrando ${filtradas.length} preguntas frecuentes`;
        }
    }

    // Si no hay resultados
    if (filtradas.length === 0) {
        contenedor.innerHTML = "";
        if (bloqueVacio) bloqueVacio.style.display = "block";
        if (btnToggle) btnToggle.style.display = "none";
        return;
    }

    if (bloqueVacio) bloqueVacio.style.display = "none";
    if (btnToggle) btnToggle.style.display = "inline-block";

    // Agrupar por categoría
    const grupos = {};
    filtradas.forEach(function (faq) {
        if (!grupos[faq.categoriaId]) {
            grupos[faq.categoriaId] = {
                nombre: faq.categoriaNombre,
                icono: faq.categoriaIcono,
                items: []
            };
        }
        grupos[faq.categoriaId].items.push(faq);
    });

    let html = "";
    Object.keys(grupos).forEach(function (catId) {
        const grupo = grupos[catId];

        html += `
            <section class="faq-categoria-grupo" data-cat="${catId}">
                <div class="faq-categoria-header">
                    <span class="faq-categoria-icono">${grupo.icono}</span>
                    <h2>${grupo.nombre}</h2>
                </div>
                <div class="faq-acordeon-lista">
        `;

        grupo.items.forEach(function (item) {
            const estadoClase = todosExpandidos ? "abierto" : "";
            html += `
                <div class="faq-item ${estadoClase}" id="faq-item-${item.id}">
                    <button type="button" class="faq-pregunta-btn" aria-expanded="${todosExpandidos}">
                        <span>${item.pregunta}</span>
                        <span class="faq-icono-flecha">▼</span>
                    </button>
                    <div class="faq-respuesta">
                        ${item.respuesta}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </section>
        `;
    });

    contenedor.innerHTML = html;

    // Asignar eventos de clic a cada pregunta
    const botonesPregunta = contenedor.querySelectorAll(".faq-pregunta-btn");
    botonesPregunta.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const faqItem = this.closest(".faq-item");
            if (!faqItem) return;

            const yaAbierto = faqItem.classList.contains("abierto");
            if (yaAbierto) {
                faqItem.classList.remove("abierto");
                this.setAttribute("aria-expanded", "false");
            } else {
                faqItem.classList.add("abierto");
                this.setAttribute("aria-expanded", "true");
            }
        });
    });
}

/* =========================================================
   ALTERNAR EXPANDIR / CONTRAER TODAS LAS PREGUNTAS
   ========================================================= */

function inicializarBotonToggleTodos() {
    const btnToggle = document.getElementById("btn-toggle-todos");
    if (!btnToggle) return;

    btnToggle.addEventListener("click", function () {
        todosExpandidos = !todosExpandidos;

        const items = document.querySelectorAll(".faq-item");
        items.forEach(function (item) {
            const btn = item.querySelector(".faq-pregunta-btn");
            if (todosExpandidos) {
                item.classList.add("abierto");
                if (btn) btn.setAttribute("aria-expanded", "true");
            } else {
                item.classList.remove("abierto");
                if (btn) btn.setAttribute("aria-expanded", "false");
            }
        });

        btnToggle.textContent = todosExpandidos ? "Contraer todas" : "Expandir todas";
    });
}

/* =========================================================
   CHIPS DE CATEGORÍA
   ========================================================= */

function inicializarChipsCategorias() {
    const chips = document.querySelectorAll(".faq-chip");
    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            chips.forEach(function (c) {
                c.classList.remove("activo");
            });

            this.classList.add("activo");
            categoriaSeleccionada = this.getAttribute("data-categoria") || "todas";
            renderizarFAQs();
        });
    });
}

/* =========================================================
   BUSCADOR EN TIEMPO REAL
   ========================================================= */

function inicializarBuscador() {
    const inputBusqueda = document.getElementById("buscar-faq");
    const btnLimpiar = document.getElementById("btn-limpiar-busqueda");

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", function (e) {
            textoBusqueda = e.target.value;
            renderizarFAQs();
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", function () {
            if (inputBusqueda) inputBusqueda.value = "";
            textoBusqueda = "";

            // Restaurar chip "Todas"
            const chips = document.querySelectorAll(".faq-chip");
            chips.forEach(function (c) {
                c.classList.remove("activo");
            });
            const chipTodas = document.querySelector('.faq-chip[data-categoria="todas"]');
            if (chipTodas) chipTodas.classList.add("activo");

            categoriaSeleccionada = "todas";
            renderizarFAQs();
        });
    }
}

/* =========================================================
   INICIALIZACIÓN AL CARGAR EL DOM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarritoNavbar();
    inicializarBuscador();
    inicializarChipsCategorias();
    inicializarBotonToggleTodos();
    renderizarFAQs();
});
