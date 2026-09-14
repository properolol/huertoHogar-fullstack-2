const formulario = document.getElementById("loginForm");

const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena") || document.getElementById("contraseña");

const errorCorreo = document.getElementById("errorCorreo") || document.getElementById("error-correo");
const errorContrasena = document.getElementById("errorContrasena") || document.getElementById("error-contraseña");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let formularioValido = true;

    if (errorCorreo) errorCorreo.textContent = "";
    if (errorContrasena) errorContrasena.textContent = "";

    if (correo.value.trim() === "") {

        errorCorreo.textContent = "Debes ingresar tu correo.";
        formularioValido = false;

    } else if (correo.value.length > 100) {

        errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";
        formularioValido = false;

    } else if (
        typeof validarCorreo === "function"
            ? !validarCorreo(correo.value)
            : (
                !correo.value.endsWith("@duoc.cl") &&
                !correo.value.endsWith("@profesor.duoc.cl") &&
                !correo.value.endsWith("@gmail.com")
            )
    ) {

        errorCorreo.textContent =
            "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        formularioValido = false;
    }

    if (contrasena && contrasena.value.trim() === "") {
        if (errorContrasena) errorContrasena.textContent = "Debes ingresar tu contraseña.";
        formularioValido = false;
    } else if (contrasena && contrasena.value.length < 4) {
        if (errorContrasena) errorContrasena.textContent = "La contraseña debe tener al menos 4 caracteres.";
        formularioValido = false;
    } else if (contrasena && contrasena.value.length > 10) {
        if (errorContrasena) errorContrasena.textContent = "La contraseña no puede superar los 10 caracteres.";
        formularioValido = false;
    }

    if (formularioValido) {

        alert("Inicio de sesión correcto.");

        formulario.reset();
    }
});

if (typeof actualizarContadorCarritoNavbarComun === "function") {
    actualizarContadorCarritoNavbarComun();
}