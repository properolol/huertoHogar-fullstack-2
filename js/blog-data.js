/* =========================================================
   HUERTOHOGAR - DATOS OFICIALES DEL BLOG Y ARTÍCULOS
   Artículos educativos sobre alimentación saludable,
   sostenibilidad y consejos del huerto (Duoc UC)
   ========================================================= */

const articulosBlog = [
    {
        id: 1,
        slug: "guia-alimentacion-saludable-temporada",
        titulo: "Guía de Alimentación Saludable: Por qué elegir frutas y verduras de temporada en Chile",
        categoria: "Alimentación Saludable",
        fecha: "10 de Septiembre, 2026",
        tiempoLectura: "5 min de lectura",
        autor: "Dra. Camila Soto (Nutrición Comunitaria)",
        imagen: "../img/blog-alimentacion-saludable.jpg",
        destacado: true,
        descripcionCorta: "Descubre cómo sintonizar tu dieta con los ciclos naturales del campo chileno multiplica los nutrientes de tus comidas y apoya la economía campesina.",
        contenidoHtml: `
            <p class="intro-parrafo">
                En un mundo donde los supermercados ofrecen tomates en pleno invierno y cítricos fuera de época, hemos perdido de vista una de las leyes más sabias de la naturaleza: <strong>los alimentos tienen un tiempo perfecto para nacer y deleitarnos</strong>. Consumir frutas y verduras cosechadas en su estación no es solo una tendencia gastronómica, sino una decisión transformadora para tu salud y tu presupuesto.
            </p>

            <h2>1. Máxima concentración de vitaminas y antioxidantes</h2>
            <p>
                Cuando una fruta madura directamente en el árbol bajo el sol del Valle Central o la brisa costera, desarrolla su potencial genético completo: niveles récord de vitamina C, betacarotenos, polifenoles y azúcares naturales. Por el contrario, los productos forzados en invernaderos o refrigerados durante meses pierden hasta un 45% de sus micronutrientes antes de llegar al plato.
            </p>

            <blockquote class="cita-destacada">
                "La naturaleza diseña cada cosecha para las necesidades fisiológicas del ser humano: cítricos llenos de vitamina C en invierno para combatir resfríos, y sandías hidratantes y verduras frescas en verano."
            </blockquote>

            <h2>2. Sabor auténtico e inigualable</h2>
            <p>
                ¿Recuerdas el aroma penetrante de una manzana recién arrancada del árbol o el dulzor crujiente de una espinaca tierna cosechada al alba? El sabor es el indicador biológico de que un vegetal contiene minerales absorbidos de una tierra fértil y descansada.
            </p>

            <div class="caja-tip-agro">
                <span class="tip-icono">💡</span>
                <div>
                    <strong>Consejo Práctico de Temporada:</strong>
                    <p>Organiza tu menú semanal según la estacionalidad: manzanas y naranjas en media estación, espinacas y zanahorias para caldos y ensaladas vivas. Tu cuerpo absorberá más nutrientes gastando menos dinero.</p>
                </div>
            </div>

            <h2>3. Menor huella de carbono y apoyo a las familias campesinas</h2>
            <p>
                Los productos de estación cultivados en Chile no requieren largos viajes en avión ni cámaras de maduración artificial acelerada por gas etileno. Al preferir HuertoHogar, aseguras que los ingresos vayan directamente a quienes madrugan en Curicó, Quillota y Melipilla, fomentando un comercio justo y transparente.
            </p>
        `,
        productosRelacionados: ["FR001", "FR002", "VR002"] // Manzanas Fuji, Naranjas Valencia, Espinacas Frescas
    },
    {
        id: 2,
        slug: "sostenibilidad-en-tu-mesa-del-campo-al-hogar",
        titulo: "Sostenibilidad en tu Mesa: Del Campo al Hogar sin intermediarios innecesarios",
        categoria: "Sostenibilidad",
        fecha: "5 de Septiembre, 2026",
        tiempoLectura: "6 min de lectura",
        autor: "Martín Valenzuela (Ingeniero Agrónomo)",
        imagen: "../img/blog-sostenibilidad-campo.jpg",
        destacado: false,
        descripcionCorta: "Conoce cómo la logística circular directa reduce las emisiones de carbono, erradica el desperdicio y dignifica los ingresos de los pequeños productores agrícolas.",
        contenidoHtml: `
            <p class="intro-parrafo">
                La cadena tradicional de distribución agroalimentaria en Chile puede llegar a tener hasta siete intermediarios entre el huerto y el consumidor urbano. En ese largo trayecto, hasta un 30% de la comida se deteriora o es descartada por razones puramente estéticas. En <strong>HuertoHogar</strong> decidimos rediseñar el mapa desde la raíz.
            </p>

            <h2>¿Qué significa realmente la logística 'Del Campo al Hogar'?</h2>
            <p>
                Significa que cuando haces un pedido, las hortalizas y frutas no han pasado semanas en bodegas intermedias. Se coordinan directamente con los centros de acopio campesinos en Santiago, Valparaíso, Concepción y Villarrica, asegurando transporte con cadena de frío eficiente y empaques compostables.
            </p>

            <div class="caja-tip-agro">
                <span class="tip-icono">🌱</span>
                <div>
                    <strong>Impacto en Números:</strong>
                    <p>Cada canasta distribuida mediante el modelo HuertoHogar ahorra en promedio 2.4 kg de CO2 en transporte y garantiza un retorno del 70% del valor de venta directo al agricultor, comparado con el 18% del modelo tradicional.</p>
                </div>
            </div>

            <h2>Comercio Justo: Más que un sello, una alianza humana</h2>
            <p>
                La verdadera sostenibilidad no es solo ecológica; es profundamente social. Cuando una familia campesina recibe un precio justo y predecible por sus zanahorias orgánicas o su miel pura, puede reinvertir en sistemas de riego tecnificado por goteo, abonos verdes y la educación de sus hijos.
            </p>

            <blockquote class="cita-destacada">
                "Consumir es un acto político y ecológico: cada vez que eliges un producto de comercio directo, estás votando por el tipo de campo chileno que quieres para las futuras generaciones."
            </blockquote>
        `,
        productosRelacionados: ["VR001", "PO001", "VR003"] // Zanahorias Orgánicas, Miel Orgánica, Pimientos Tricolores
    },
    {
        id: 3,
        slug: "consejos-conservar-verduras-crujientes",
        titulo: "5 Consejos y Datos Curiosos para conservar tus verduras crujientes por semanas",
        categoria: "Consejos del Hogar",
        fecha: "28 de Agosto, 2026",
        tiempoLectura: "4 min de lectura",
        autor: "Equipo Culinario HuertoHogar",
        imagen: "../img/blog-conservacion-verduras.jpg",
        destacado: false,
        descripcionCorta: "Aprende trucos sencillos sobre el gas etileno, la humedad ideal y el almacenamiento inteligente para que tus hojas verdes y hortalizas nunca más se marchiten.",
        contenidoHtml: `
            <p class="intro-parrafo">
                No hay nada más frustrante que abrir el cajón del refrigerador y descubrir que las espinacas frescas o los pimientos crujientes se han ablandado antes de tiempo. La buena noticia es que con un par de principios de química botánica casera puedes duplicar y hasta triplicar la vida útil de tus vegetales.
            </p>

            <h2>1. El misterio del Gas Etileno: ¿Por qué separar plátanos y manzanas?</h2>
            <p>
                Ciertas frutas (como los plátanos y las manzanas) son <em>climatéricas</em>: continúan liberando etileno después de ser cosechadas. Este gas acelera el envejecimiento de verduras sensibles como las hojas verdes y las zanahorias. <strong>Regla de oro:</strong> guarda las frutas climatéricas en un frutero aireado y las verduras en su propio cajón.
            </p>

            <h2>2. El truco del papel absorbente en las hojas verdes</h2>
            <p>
                La humedad estancada es el enemigo número uno de la clorofila. Guarda tus espinacas y lechugas en recipientes de vidrio o bolsas de algodón con una hoja de papel reutilizable o toalla de tela que absorba el exceso de condensación.
            </p>

            <div class="caja-tip-agro">
                <span class="tip-icono">🥕</span>
                <div>
                    <strong>Dato Curioso de las Zanahorias:</strong>
                    <p>Si cortas las hojas verdes superiores de las zanahorias apenas lleguen a casa, evitarás que sigan absorbiendo la humedad de la raíz. ¡Permanecerán firmes y dulces por más de 3 semanas!</p>
                </div>
            </div>

            <h2>3. Los pimientos: mejor enteros y bien secos</h2>
            <p>
                Los pimientos tricolores aman el frío moderado (7° a 10°C). Lávalos solo justo antes de consumirlos; si los lavas antes de refrigerar, la humedad favorecerá hongos en el pedúnculo.
            </p>
        `,
        productosRelacionados: ["VR003", "FR003", "VR001"] // Pimientos Tricolores, Plátanos Cavendish, Zanahorias Orgánicas
    },
    {
        id: 4,
        slug: "poder-alimentos-ancestrales-quinua-miel",
        titulo: "El Poder de los Alimentos Ancestrales: Quinua Andina y Miel de Bosque Nativo",
        categoria: "Superalimentos",
        fecha: "18 de Agosto, 2026",
        tiempoLectura: "5 min de lectura",
        autor: "Nicolás Araya (Especialista en Agroecología)",
        imagen: "../img/blog-alimentos-ancestrales.jpg",
        destacado: false,
        descripcionCorta: "Explora la riqueza nutricional de dos tesoros milenarios de nuestro suelo: la proteína vegetal completa de la quinua y las defensas vivas de la miel pura.",
        contenidoHtml: `
            <p class="intro-parrafo">
                Mucho antes de que existieran los suplementos multivitamínicos modernos, los pueblos originarios de los Andes y los bosques del sur de Chile ya conocían los secretos de la longevidad y la fuerza física a través de dos superalimentos prodigiosos: la <strong>quinua orgánica</strong> y la <strong>miel cruda de bosque nativo</strong>.
            </p>

            <h2>Quinua: El grano sagrado con proteína completa</h2>
            <p>
                La quinua es uno de los pocos alimentos vegetales del planeta que contiene los nueve aminoácidos esenciales que el cuerpo humano no puede sintetizar por sí mismo. Además, es naturalmente libre de gluten, rica en hierro, magnesio y fibra prebiótica que cuida la microbiota intestinal.
            </p>

            <blockquote class="cita-destacada">
                "La miel procesada industrialmente se pasteuriza a altas temperaturas, destruyendo sus enzimas vivas. En cambio, la miel cruda de HuertoHogar mantiene intacto el polen nativo y sus propiedades antibióticas naturales."
            </blockquote>

            <h2>Miel de bosque nativo: Defensa inmunológica líquida</h2>
            <p>
                Recolectada en colmenas libres de pesticidas en la zona lacustre de Villarrica, esta miel multifloral contiene néctar de ulmo, tiaca y quillay, reconocidos científicamente por su potente acción antibacterial y cicatrizante.
            </p>

            <div class="caja-tip-agro">
                <span class="tip-icono">🍯</span>
                <div>
                    <strong>Receta Energética Matutina:</strong>
                    <p>Prepara un tazón de quinua cocida con leche entera fresca tibia, una cucharada colmada de miel orgánica pura y rodajas de manzana Fuji crujiente. Energía limpia y duradera para toda tu mañana.</p>
                </div>
            </div>
        `,
        productosRelacionados: ["PO003", "PO001", "PL001"] // Quinua Orgánica, Miel Orgánica, Leche Entera
    }
];
