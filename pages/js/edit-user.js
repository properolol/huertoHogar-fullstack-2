const regiones = [
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
            "Pica"
        ]
    },

    {
        nombre: "Antofagasta",
        comunas: [
            "Antofagasta",
            "Calama",
            "Tocopilla",
            "Mejillones"
        ]
    },

    {
        nombre: "Atacama",
        comunas: [
            "Copiapó",
            "Caldera",
            "Vallenar",
            "Chañaral"
        ]
    },

    {
        nombre: "Coquimbo",
        comunas: [
            "La Serena",
            "Coquimbo",
            "Ovalle",
            "Illapel"
        ]
    },

    {
        nombre: "Valparaíso",
        comunas: [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana"
        ]
    },

    {
        nombre: "Metropolitana de Santiago",
        comunas: [
            "Santiago",
            "Independencia",
            "Recoleta",
            "Maipú",
            "Providencia",
            "Las Condes"
        ]
    },

    {
        nombre: "O'Higgins",
        comunas: [
            "Rancagua",
            "Machalí",
            "Rengo",
            "San Fernando"
        ]
    },

    {
        nombre: "Maule",
        comunas: [
            "Talca",
            "Curicó",
            "Linares",
            "Constitución"
        ]
    },

    {
        nombre: "Ñuble",
        comunas: [
            "Chillán",
            "Bulnes",
            "San Carlos",
            "Yungay"
        ]
    },

    {
        nombre: "Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "Los Ángeles",
            "Coronel"
        ]
    },

    {
        nombre: "La Araucanía",
        comunas: [
            "Temuco",
            "Angol",
            "Villarrica",
            "Pucón"
        ]
    },

    {
        nombre: "Los Ríos",
        comunas: [
            "Valdivia",
            "La Unión",
            "Río Bueno",
            "Panguipulli"
        ]
    },

    {
        nombre: "Los Lagos",
        comunas: [
            "Puerto Montt",
            "Puerto Varas",
            "Osorno",
            "Castro"
        ]
    },

    {
        nombre: "Aysén",
        comunas: [
            "Coyhaique",
            "Aysén",
            "Chile Chico",
            "Cochrane"
        ]
    },

    {
        nombre: "Magallanes",
        comunas: [
            "Punta Arenas",
            "Puerto Natales",
            "Porvenir",
            "Cabo de Hornos"
        ]
    }
];

const region = document.getElementById("region");
const comuna = document.getElementById("comuna");
const formulario = document.getElementById("formulario-editar-usuario");

regiones.forEach(function (regionActual) {

    const opcion = document.createElement("option");

    opcion.value = regionActual.nombre;
    opcion.textContent = regionActual.nombre;

    region.appendChild(opcion);

});

region.value = "Metropolitana de Santiago";

function cargarComunas() {

    comuna.innerHTML = `
        <option value="">Seleccione una comuna</option>
    `;

    const regionSeleccionada = regiones.find(function (regionActual) {

        return regionActual.nombre === region.value;

    });


    if (regionSeleccionada) {

        regionSeleccionada.comunas.forEach(function (nombreComuna) {

            const opcion = document.createElement("option");

            opcion.value = nombreComuna;
            opcion.textContent = nombreComuna;

            comuna.appendChild(opcion);

        });

    }

}

cargarComunas();

comuna.value = "Independencia";

region.addEventListener("change", function () {

    cargarComunas();

});

function validarRun(run) {

    run = run.toUpperCase();


    if (run.length < 7 || run.length > 9) {
        return false;
    }


    if (!/^[0-9]{6,8}[0-9K]$/.test(run)) {
        return false;
    }


    const cuerpo = run.slice(0, -1);
    const digitoVerificador = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;


    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }

    }


    const resto = 11 - (suma % 11);

    let resultado;


    if (resto === 11) {

        resultado = "0";

    } else if (resto === 10) {

        resultado = "K";

    } else {

        resultado = resto.toString();

    }


    return resultado === digitoVerificador;

}

function validarCorreo(correo) {

    const patron =
        /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    return patron.test(correo);

}

function limpiarErrores() {

    document.getElementById("error-run").textContent = "";
    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-apellidos").textContent = "";
    document.getElementById("error-correo").textContent = "";
    document.getElementById("error-tipo").textContent = "";
    document.getElementById("error-region").textContent = "";
    document.getElementById("error-comuna").textContent = "";
    document.getElementById("error-direccion").textContent = "";

}

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    limpiarErrores();

    let formularioValido = true;

    const run = document.getElementById("run").value.trim().toUpperCase();

    if (run === "") {

        document.getElementById("error-run").textContent =
            "El RUN es obligatorio.";

        formularioValido = false;

    } else if (!validarRun(run)) {

        document.getElementById("error-run").textContent =
            "Ingrese un RUN chileno válido.";

        formularioValido = false;

    }

    const nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {

        document.getElementById("error-nombre").textContent =
            "El nombre es obligatorio.";

        formularioValido = false;

    } else if (nombre.length > 50) {

        document.getElementById("error-nombre").textContent =
            "El nombre no puede superar los 50 caracteres.";

        formularioValido = false;

    }

    const apellidos =
        document.getElementById("apellidos").value.trim();

    if (apellidos === "") {

        document.getElementById("error-apellidos").textContent =
            "Los apellidos son obligatorios.";

        formularioValido = false;

    } else if (apellidos.length > 100) {

        document.getElementById("error-apellidos").textContent =
            "Los apellidos no pueden superar los 100 caracteres.";

        formularioValido = false;

    }

    const correo = document.getElementById("correo").value.trim();

    if (correo === "") {

        document.getElementById("error-correo").textContent =
            "El correo es obligatorio.";

        formularioValido = false;

    } else if (correo.length > 100) {

        document.getElementById("error-correo").textContent =
            "El correo no puede superar los 100 caracteres.";

        formularioValido = false;

    } else if (!validarCorreo(correo)) {

        document.getElementById("error-correo").textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        formularioValido = false;

    }

    const tipoUsuario =
        document.getElementById("tipo-usuario").value;

    if (tipoUsuario === "") {

        document.getElementById("error-tipo").textContent =
            "Debe seleccionar un tipo de usuario.";

        formularioValido = false;

    }

    if (region.value === "") {

        document.getElementById("error-region").textContent =
            "Debe seleccionar una región.";

        formularioValido = false;

    }

    if (comuna.value === "") {

        document.getElementById("error-comuna").textContent =
            "Debe seleccionar una comuna.";

        formularioValido = false;

    }

    const direccion =
        document.getElementById("direccion").value.trim();

    if (direccion === "") {

        document.getElementById("error-direccion").textContent =
            "La dirección es obligatoria.";

        formularioValido = false;

    } else if (direccion.length > 300) {

        document.getElementById("error-direccion").textContent =
            "La dirección no puede superar los 300 caracteres.";

        formularioValido = false;

    }

    if (formularioValido) {

        alert("Los datos del usuario fueron actualizados correctamente.");

        window.location.href = "./users.html";

    }

});