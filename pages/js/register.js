const regiones = {
    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],

    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica"
    ],

    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Mejillones",
        "Tocopilla"
    ],

    "Atacama": [
        "Copiapó",
        "Caldera",
        "Vallenar",
        "Diego de Almagro"
    ],

    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "San Antonio"
    ],

    "Metropolitana de Santiago": [
        "Santiago",
        "Maipú",
        "Puente Alto",
        "Las Condes",
        "La Florida",
        "Independencia"
    ],

    "O'Higgins": [
        "Rancagua",
        "Machalí",
        "Rengo",
        "San Fernando"
    ],

    "Maule": [
        "Talca",
        "Curicó",
        "Linares",
        "Constitución"
    ],

    "Ñuble": [
        "Chillán",
        "San Carlos",
        "Bulnes",
        "Yungay"
    ],

    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "Coronel"
    ],

    "La Araucanía": [
        "Temuco",
        "Angol",
        "Villarrica",
        "Pucón"
    ],

    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Río Bueno",
        "Panguipulli"
    ],

    "Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Castro",
        "Ancud"
    ],

    "Aysén": [
        "Coyhaique",
        "Aysén",
        "Chile Chico",
        "Cochrane"
    ],

    "Magallanes y de la Antártica Chilena": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir",
        "Cabo de Hornos"
    ]
};


const formulario = document.getElementById("registro-form");

const run = document.getElementById("run");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");

const fechaNacimiento = document.getElementById("fecha-nacimiento");

const region = document.getElementById("region");
const comuna = document.getElementById("comuna");

const direccion = document.getElementById("direccion");

const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById(
    "confirmar-contrasena"
);

const mensajeRegistro = document.getElementById(
    "mensaje-registro"
);


for (let nombreRegion in regiones) {

    const opcion = document.createElement("option");

    opcion.value = nombreRegion;
    opcion.textContent = nombreRegion;

    region.appendChild(opcion);
}


region.addEventListener("change", function () {

    const regionSeleccionada = region.value;

    comuna.innerHTML = "";


    if (regionSeleccionada === "") {

        comuna.disabled = true;

        const opcion = document.createElement("option");

        opcion.value = "";
        opcion.textContent = "Primero selecciona una región";

        comuna.appendChild(opcion);

        return;
    }


    comuna.disabled = false;


    const opcionInicial = document.createElement("option");

    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona una comuna";

    comuna.appendChild(opcionInicial);


    const comunas = regiones[regionSeleccionada];


    comunas.forEach(function (nombreComuna) {

        const opcion = document.createElement("option");

        opcion.value = nombreComuna;
        opcion.textContent = nombreComuna;

        comuna.appendChild(opcion);
    });

});


function validarRUN(valorRUN) {

    valorRUN = valorRUN.trim().toUpperCase();


    if (valorRUN.length < 7 || valorRUN.length > 9) {
        return false;
    }


    if (valorRUN.includes(".") || valorRUN.includes("-")) {
        return false;
    }


    if (!/^\d{7,8}[0-9K]$/.test(valorRUN)) {
        return false;
    }


    const cuerpo = valorRUN.slice(0, -1);
    const digitoVerificador = valorRUN.slice(-1);


    let suma = 0;
    let multiplicador = 2;


    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;


        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }


    const resto = suma % 11;
    const resultado = 11 - resto;

    let digitoEsperado;


    if (resultado === 11) {

        digitoEsperado = "0";

    } else if (resultado === 10) {

        digitoEsperado = "K";

    } else {

        digitoEsperado = resultado.toString();
    }


    return digitoVerificador === digitoEsperado;
}


function mostrarError(campo, mensaje) {

    const elementoError = document.getElementById(
        campo + "-error"
    );

    elementoError.textContent = mensaje;
}


function limpiarError(campo) {

    const elementoError = document.getElementById(
        campo + "-error"
    );

    elementoError.textContent = "";
}


formulario.addEventListener("submit", function (event) {

    event.preventDefault();


    let formularioValido = true;


    const valorRUN = run.value.trim();


    if (valorRUN === "") {

        mostrarError(
            "run",
            "Debes ingresar tu RUN."
        );

        formularioValido = false;

    } else if (!validarRUN(valorRUN)) {

        mostrarError(
            "run",
            "El RUN ingresado no es válido. Ejemplo: 19011022K."
        );

        formularioValido = false;

    } else {

        limpiarError("run");
    }


    const valorNombre = nombre.value.trim();


    if (valorNombre === "") {

        mostrarError(
            "nombre",
            "Debes ingresar tu nombre."
        );

        formularioValido = false;

    } else if (valorNombre.length > 50) {

        mostrarError(
            "nombre",
            "El nombre no puede superar los 50 caracteres."
        );

        formularioValido = false;

    } else {

        limpiarError("nombre");
    }


    const valorApellidos = apellidos.value.trim();


    if (valorApellidos === "") {

        mostrarError(
            "apellidos",
            "Debes ingresar tus apellidos."
        );

        formularioValido = false;

    } else if (valorApellidos.length > 100) {

        mostrarError(
            "apellidos",
            "Los apellidos no pueden superar los 100 caracteres."
        );

        formularioValido = false;

    } else {

        limpiarError("apellidos");
    }


    const valorCorreo = correo.value.trim();


    const correoValido =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


    if (valorCorreo === "") {

        mostrarError(
            "correo",
            "Debes ingresar tu correo electrónico."
        );

        formularioValido = false;

    } else if (valorCorreo.length > 100) {

        mostrarError(
            "correo",
            "El correo no puede superar los 100 caracteres."
        );

        formularioValido = false;

    } else if (!correoValido.test(valorCorreo)) {

        mostrarError(
            "correo",
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        formularioValido = false;

    } else {

        limpiarError("correo");
    }


    if (region.value === "") {

        mostrarError(
            "region",
            "Debes seleccionar una región."
        );

        formularioValido = false;

    } else {

        limpiarError("region");
    }


    if (comuna.value === "") {

        mostrarError(
            "comuna",
            "Debes seleccionar una comuna."
        );

        formularioValido = false;

    } else {

        limpiarError("comuna");
    }


    const valorDireccion = direccion.value.trim();


    if (valorDireccion === "") {

        mostrarError(
            "direccion",
            "Debes ingresar tu dirección."
        );

        formularioValido = false;

    } else if (valorDireccion.length > 300) {

        mostrarError(
            "direccion",
            "La dirección no puede superar los 300 caracteres."
        );

        formularioValido = false;

    } else {

        limpiarError("direccion");
    }


    const valorContrasena = contrasena.value;


    if (valorContrasena === "") {

        mostrarError(
            "contrasena",
            "Debes ingresar una contraseña."
        );

        formularioValido = false;

    } else if (
        valorContrasena.length < 4 ||
        valorContrasena.length > 10
    ) {

        mostrarError(
            "contrasena",
            "La contraseña debe tener entre 4 y 10 caracteres."
        );

        formularioValido = false;

    } else {

        limpiarError("contrasena");
    }


    const valorConfirmar = confirmarContrasena.value;


    if (valorConfirmar === "") {

        mostrarError(
            "confirmar-contrasena",
            "Debes confirmar tu contraseña."
        );

        formularioValido = false;

    } else if (valorConfirmar !== valorContrasena) {

        mostrarError(
            "confirmar-contrasena",
            "Las contraseñas no coinciden."
        );

        formularioValido = false;

    } else {

        limpiarError("confirmar-contrasena");
    }


    if (formularioValido) {

        mensajeRegistro.textContent =
            "Registro realizado correctamente.";

        mensajeRegistro.style.color = "green";


        formulario.reset();


        comuna.disabled = true;

        comuna.innerHTML =
            '<option value="">Primero selecciona una región</option>';

    } else {

        mensajeRegistro.textContent =
            "Por favor, corrige los campos indicados.";

        mensajeRegistro.style.color = "red";
    }

});