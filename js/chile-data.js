/* =========================================================
   HUERTOHOGAR - DATOS GEOGRÁFICOS DE CHILE
   Colección canónica de las 16 regiones y comunas del país
   ========================================================= */

const REGIONES_CHILE = [
    {
        nombre: "Arica y Parinacota",
        comunas: [
            "Arica",
            "Camarones",
            "Putre",
            "General Lagos"
        ]
    },
    {
        nombre: "Tarapacá",
        comunas: [
            "Iquique",
            "Alto Hospicio",
            "Pozo Almonte",
            "Pica",
            "Huara",
            "Camiña",
            "Colchane"
        ]
    },
    {
        nombre: "Antofagasta",
        comunas: [
            "Antofagasta",
            "Calama",
            "Tocopilla",
            "Mejillones",
            "Taltal",
            "San Pedro de Atacama",
            "Sierra Gorda",
            "María Elena",
            "Ollagüe"
        ]
    },
    {
        nombre: "Atacama",
        comunas: [
            "Copiapó",
            "Caldera",
            "Vallenar",
            "Chañaral",
            "Huasco",
            "Freirina",
            "Tierra Amarilla",
            "Diego de Almagro",
            "Alto del Carmen"
        ]
    },
    {
        nombre: "Coquimbo",
        comunas: [
            "La Serena",
            "Coquimbo",
            "Ovalle",
            "Illapel",
            "Vicuña",
            "Salamanca",
            "Los Vilos",
            "Monte Patria",
            "Combarbalá",
            "Andacollo"
        ]
    },
    {
        nombre: "Valparaíso",
        comunas: [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana",
            "Concón",
            "Quillota",
            "San Antonio",
            "Los Andes",
            "San Felipe",
            "Limache",
            "La Calera"
        ]
    },
    {
        nombre: "Metropolitana de Santiago",
        comunas: [
            "Santiago",
            "Providencia",
            "Las Condes",
            "Ñuñoa",
            "Maipú",
            "Puente Alto",
            "La Florida",
            "San Miguel",
            "Independencia",
            "Recoleta",
            "Melipilla",
            "Talagante",
            "Buin",
            "Paine",
            "Colina",
            "Lampa",
            "San Bernardo"
        ]
    },
    {
        nombre: "O'Higgins",
        comunas: [
            "Rancagua",
            "Machalí",
            "Rengo",
            "San Fernando",
            "Pichilemu",
            "Santa Cruz",
            "Graneros",
            "San Vicente",
            "Chimbarongo",
            "Mostazal"
        ]
    },
    {
        nombre: "Maule",
        comunas: [
            "Talca",
            "Curicó",
            "Linares",
            "Constitución",
            "Cauquenes",
            "Molina",
            "San Javier",
            "Parral",
            "San Clemente",
            "Teno"
        ]
    },
    {
        nombre: "Ñuble",
        comunas: [
            "Chillán",
            "Chillán Viejo",
            "San Carlos",
            "Bulnes",
            "Yungay",
            "Quirihue",
            "Coihueco",
            "San Nicolás",
            "Pinto"
        ]
    },
    {
        nombre: "Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "San Pedro de la Paz",
            "Coronel",
            "Chiguayante",
            "Los Ángeles",
            "Nacimiento",
            "Tomé",
            "Penco",
            "Hualpén",
            "Arauco"
        ]
    },
    {
        nombre: "La Araucanía",
        comunas: [
            "Temuco",
            "Padre Las Casas",
            "Villarrica",
            "Pucón",
            "Angol",
            "Victoria",
            "Lautaro",
            "Nueva Imperial",
            "Collipulli"
        ]
    },
    {
        nombre: "Los Ríos",
        comunas: [
            "Valdivia",
            "La Unión",
            "Río Bueno",
            "Panguipulli",
            "Paillaco",
            "Mariquina",
            "Los Lagos",
            "Futrono"
        ]
    },
    {
        nombre: "Los Lagos",
        comunas: [
            "Puerto Montt",
            "Puerto Varas",
            "Osorno",
            "Castro",
            "Ancud",
            "Frutillar",
            "Llanquihue",
            "Calbuco",
            "Quellón",
            "Chaitén"
        ]
    },
    {
        nombre: "Aysén",
        comunas: [
            "Coyhaique",
            "Aysén",
            "Chile Chico",
            "Cochrane",
            "Cisnes"
        ]
    },
    {
        nombre: "Magallanes y de la Antártica Chilena",
        comunas: [
            "Punta Arenas",
            "Puerto Natales",
            "Porvenir",
            "Cabo de Hornos"
        ]
    }
];

// Mapa indexado por nombre de región para acceso rápido O(1)
const COMUNAS_POR_REGION = {};
REGIONES_CHILE.forEach(function (r) {
    COMUNAS_POR_REGION[r.nombre] = r.comunas;
    // Alias para "Magallanes" corto
    if (r.nombre.startsWith("Magallanes")) {
        COMUNAS_POR_REGION["Magallanes"] = r.comunas;
    }
});
