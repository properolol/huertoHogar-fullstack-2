const formulario = document.getElementById("loginForm");

const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");

const errorCorreo = document.getElementById("error-correo");
const errorContraseña = document.getElementById("error-contraseña");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let formularioValido = true;

    errorCorreo.textContent = "";
    errorContraseña.textContent = "";

    if (correo.value.trim() === "") {

        errorCorreo.textContent = "Debes ingresar tu correo.";
        formularioValido = false;

    } else if (correo.value.length > 100) {

        errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";
        formularioValido = false;

    } else if (
        !correo.value.endsWith("@duoc.cl") &&
        !correo.value.endsWith("@profesor.duoc.cl") &&
        !correo.value.endsWith("@gmail.com")
    ) {

        errorCorreo.textContent =
            "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        formularioValido = false;
    }

    if (contraseña.value.trim() === "") {

        errorContraseña.textContent = "Debes ingresar tu contraseña.";
        formularioValido = false;

    } else if (contraseña.value.length < 4) {

        errorContraseña.textContent =
            "La contraseña debe tener al menos 4 caracteres.";

        formularioValido = false;

    } else if (contraseña.value.length > 10) {

        errorContraseña.textContent =
            "La contraseña no puede superar los 10 caracteres.";

        formularioValido = false;
    }

    if (formularioValido) {

        alert("Inicio de sesión correcto.");

        formulario.reset();
    }
});