document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    if (!form) return;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const rut = document.getElementById("rut");

    // Eventos de entrada en tiempo real
    nombre.addEventListener("input", validarNombre);
    email.addEventListener("input", validarEmail);
    rut.addEventListener("input", validarRut);

    function validarNombre() {
        const error = document.getElementById("error-nombre");
        if (nombre.value.trim() === "") {
            error.textContent = "El nombre no puede estar vacío.";
            return false;
        } else {
            error.textContent = "";
            return true;
        }
    }

    function validarEmail() {
        const error = document.getElementById("error-email");
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value.trim())) {
            error.textContent = "Ingrese un correo electrónico válido.";
            return false;
        } else {
            error.textContent = "";
            return true;
        }
    }

    function validarRut() {
        const error = document.getElementById("error-rut");
        if (rut.value.trim().length < 8) {
            error.textContent = "El RUT debe tener al menos 8 caracteres.";
            return false;
        } else {
            error.textContent = "";
            return true;
        }
    }

    // Validación al enviar
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const esNombreValido = validarNombre();
        const esEmailValido = validarEmail();
        const esRutValido = validarRut();

        if (esNombreValido && esEmailValido && esRutValido) {
            alert("Formulario enviado con éxito.");
            form.reset();
        }
    });
});