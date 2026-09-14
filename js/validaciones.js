/* =========================================================
   HUERTOHOGAR - VALIDACIONES COMUNES
   Funciones compartidas de validación de RUN chileno y correos
   ========================================================= */

/**
 * Valida un RUN chileno sin puntos ni guion (ej: 19011022K).
 * Longitud esperada: 7 a 9 caracteres alfanuméricos.
 */
function validarRUN(valorRUN) {
    if (!valorRUN || typeof valorRUN !== "string") return false;

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
        suma += parseInt(cuerpo[i], 10) * multiplicador;
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

// Alias camelCase
const validarRun = validarRUN;

/**
 * Valida que el correo termine en un dominio permitido por la pauta Duoc UC
 * (@duoc.cl, @profesor.duoc.cl, @gmail.com)
 */
function validarCorreo(correo) {
    if (!correo || typeof correo !== "string") return false;

    const correoLimpio = correo.trim().toLowerCase();
    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com"
    ];

    for (let i = 0; i < dominiosPermitidos.length; i++) {
        if (correoLimpio.endsWith(dominiosPermitidos[i])) {
            return true;
        }
    }

    return false;
}
