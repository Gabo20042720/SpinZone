document.addEventListener("DOMContentLoaded", () => {
    // Validaciones de Formularios en Tiempo Real
    const formContacto = document.getElementById("form-contacto");
    const formRegistro = document.getElementById("form-registro");
    const formLogin = document.getElementById("form-login");

    if (formContacto) {
        setupValidation("form-contacto", ["nombre", "email", "rut"]);
    }

    if (formRegistro) {
        setupValidation("form-registro", ["nombre", "email", "rut", "password"]);
    }

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            // Redirige al administrador al iniciar sesión
            window.location.href = "admin/index.html";
        });
    }

    function setupValidation(formId, fields) {
        const form = document.getElementById(formId);
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener("input", () => validateField(input));
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !validateField(input)) isValid = false;
            });
            if (isValid) {
                alert("Formulario procesado con éxito.");
                form.reset();
            }
        });
    }

    function validateField(input) {
        const errorSpan = document.getElementById(`error-${input.id}`);
        if (!errorSpan) return true;

        if (input.value.trim() === "") {
            errorSpan.textContent = "Este campo es obligatorio.";
            return false;
        }

        if (input.id === "email") {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(input.value.trim())) {
                errorSpan.textContent = "Correo inválido.";
                return false;
            }
        }

        if (input.id === "rut") {
            if (input.value.trim().length < 8) {
                errorSpan.textContent = "RUT debe tener al menos 8 caracteres.";
                return false;
            }
        }

        errorSpan.textContent = "";
        return true;
    }
});