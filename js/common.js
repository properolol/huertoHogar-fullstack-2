/* =========================================================
   HUERTOHOGAR - UTILIDADES COMUNES
   Funciones compartidas de almacenamiento, formato y carrito
   ========================================================= */

const productosInicialesGlobal = [
    {
        codigo: "FR001",
        nombre: "Manzanas Fuji",
        descripcion: "Manzanas Fuji crujientes, dulces y de excelente calidad cosechadas en el Valle Central.",
        precio: 1200,
        stock: 150,
        stockCritico: 20,
        categoria: "Frutas Frescas",
        imagen: "manzanas-fuji.png.png",
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
        imagen: "naranjas-valencia.png.jpg",
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
        imagen: "platanos-cavendish.png.jpg",
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
        imagen: "zanahorias-organicas.png.jpg",
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
        imagen: "espinacas-frescas.png.jpg",
        origen: "Pudahuel Rural, Región Metropolitana",
        practicas: "Cosecha al alba y empaque sin plásticos."
    },
    {
        codigo: "VR003",
        nombre: "Pimientos Tricolores",
        descripcion: "Pimientos rojos, amarillos y verdes, aromáticos y crujientes.",
        precio: 1500,
        stock: 120,
        stockCritico: 20,
        categoria: "Verduras Orgánicas",
        imagen: "pimientos-tricolores.png.jpg",
        origen: "Valle de Limache, Región de Valparaíso",
        practicas: "Invernaderos solares pasivos sin pesticidas sintéticos."
    },
    {
        codigo: "PO001",
        nombre: "Miel Orgánica",
        descripcion: "Miel multifloral 100% pura y cruda, recolectada en colmenas del sur de Chile.",
        precio: 5000,
        stock: 50,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "miel-organica.png.jpg",
        origen: "Bosques nativos de Villarrica, La Araucanía",
        practicas: "Apicultura regenerativa con respeto al ciclo de la colmena."
    },
    {
        codigo: "PO003",
        nombre: "Quinua Orgánica",
        descripcion: "Quinua orgánica andina seleccionada, grano ancestral rico en proteínas.",
        precio: 3500,
        stock: 60,
        stockCritico: 10,
        categoria: "Productos Orgánicos",
        imagen: "quinua-organica.png.jpg",
        origen: "Secano Costero de O'Higgins / Altiplano",
        practicas: "Cultivo ancestral agroecológico sin transgénicos."
    },
    {
        codigo: "PL001",
        nombre: "Leche Entera",
        descripcion: "Leche entera fresca de libre pastoreo, sin conservantes artificiales.",
        precio: 1200,
        stock: 100,
        stockCritico: 15,
        categoria: "Productos Lácteos",
        imagen: "leche-entera.png.jpg",
        origen: "Praderas de Puerto Octay / Osorno, Los Lagos",
        practicas: "Vacas en libre pastoreo con bienestar animal garantizado."
    }
];

/**
 * Formatea un número como pesos chilenos ($1.200)
 */
function formatoPrecioComun(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

/**
 * Actualiza el texto del botón del carrito en el navbar
 */
function actualizarContadorCarritoNavbarComun() {
    const cartSpan = document.getElementById("cart-span");
    const contadorCarrito = document.getElementById("contador-carrito");

    try {
        const guardado = localStorage.getItem("carrito");
        if (!guardado) {
            if (cartSpan) cartSpan.textContent = "Carrito";
            if (contadorCarrito) contadorCarrito.textContent = "0";
            return;
        }

        const carrito = JSON.parse(guardado);
        if (!Array.isArray(carrito) || carrito.length === 0) {
            if (cartSpan) cartSpan.textContent = "Carrito";
            if (contadorCarrito) contadorCarrito.textContent = "0";
            return;
        }

        const totalUnidades = carrito.reduce(function (acc, item) {
            return acc + Number(item.cantidad || 0);
        }, 0);

        if (cartSpan) {
            if (totalUnidades <= 0) {
                cartSpan.textContent = "Carrito";
            } else {
                cartSpan.textContent = totalUnidades === 1 ? "1 ítem" : `${totalUnidades} ítems`;
            }
        }

        if (contadorCarrito) {
            contadorCarrito.textContent = totalUnidades;
        }
    } catch (e) {
        if (cartSpan) cartSpan.textContent = "Carrito";
    }
}
