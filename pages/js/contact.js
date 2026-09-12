const formulario = document.getElementById("formulario-contacto");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorCorreo = document.getElementById("error-correo");
const errorMensaje = document.getElementById("error-mensaje");


function validarCorreo(correo) {

    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com"
    ];

    for (let dominio of dominiosPermitidos) {
        if (correo.endsWith(dominio)) {
            return true;
        }
    }

    return false;
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let formularioValido = true;

    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorMensaje.textContent = "";

    if (nombre.value.trim() === "") {

        errorNombre.textContent = "El nombre es obligatorio.";
        formularioValido = false;

    } else if (nombre.value.trim().length > 100) {

        errorNombre.textContent =
            "El nombre no puede superar los 100 caracteres.";

        formularioValido = false;
    }

    if (correo.value.trim() === "") {

        errorCorreo.textContent = "El correo es obligatorio.";
        formularioValido = false;

    } else if (correo.value.trim().length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres.";

        formularioValido = false;

    } else if (!validarCorreo(correo.value.trim())) {

        errorCorreo.textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        formularioValido = false;
    }

    if (mensaje.value.trim() === "") {

        errorMensaje.textContent = "El comentario es obligatorio.";
        formularioValido = false;

    } else if (mensaje.value.trim().length > 500) {

        errorMensaje.textContent =
            "El comentario no puede superar los 500 caracteres.";

        formularioValido = false;
    }

    if (formularioValido) {

        alert("Mensaje enviado correctamente.");

        formulario.reset();
    }

});