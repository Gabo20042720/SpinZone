document.addEventListener("DOMContentLoaded", () => {
  // ====================================================
  // 1. VALIDACIÓN FORMULARIO INICIO DE SESIÓN (LOGIN)
  // ====================================================
  const formLogin = document.querySelector("#form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      let valido = true;
      limpiarErrores(formLogin);

      const correo = document.querySelector("#login-correo");
      const password = document.querySelector("#login-password");

      // Validar Correo
      if (!correo || !validarCorreo(correo.value.trim())) {
        mostrarError(correo, "Correo no válido. Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com");
        valido = false;
      }

      // Validar Contraseña (entre 4 y 10 caracteres)
      if (!password || password.value.length < 4 || password.value.length > 10) {
        mostrarError(password, "La contraseña debe tener entre 4 y 10 caracteres.");
        valido = false;
      }

      // Evita el envío si hay algún error
      if (!valido) {
        e.preventDefault();
      }
    });
  }

  // ====================================================
  // 2. VALIDACIÓN FORMULARIO REGISTRO DE USUARIO
  // ====================================================
  const formRegistro = document.querySelector("#form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      let valido = true;
      limpiarErrores(formRegistro);

      const run = document.querySelector("#registro-run");
      const nombre = document.querySelector("#registro-nombre");
      const apellidos = document.querySelector("#registro-apellidos");
      const correo = document.querySelector("#registro-correo");
      const password = document.querySelector("#registro-password");

      // Validar RUN/RUT (sin puntos ni guion, entre 7 y 9 caracteres)
      const regexRun = /^[0-9]{6,8}[0-9kK]{1}$/;
      if (!run || !regexRun.test(run.value.trim()) || run.value.trim().length < 7 || run.value.trim().length > 9) {
        mostrarError(run, "RUT inválido. Formato sin puntos ni guión (ej: 19011022K), entre 7 y 9 caracteres.");
        valido = false;
      }

      // Validar Nombre (obligatorio, máx 50 caracteres)
      if (!nombre || nombre.value.trim() === "" || nombre.value.trim().length > 50) {
        mostrarError(nombre, "El nombre es obligatorio (máximo 50 caracteres).");
        valido = false;
      }

      // Validar Apellidos (obligatorio, máx 100 caracteres)
      if (!apellidos || apellidos.value.trim() === "" || apellidos.value.trim().length > 100) {
        mostrarError(apellidos, "Los apellidos son obligatorios (máximo 100 caracteres).");
        valido = false;
      }

      // Validar Correo
      if (!correo || !validarCorreo(correo.value.trim())) {
        mostrarError(correo, "Correo no válido. Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        valido = false;
      }

      // Validar Contraseña (entre 4 y 10 caracteres)
      if (!password || password.value.length < 4 || password.value.length > 10) {
        mostrarError(password, "La contraseña debe tener entre 4 y 10 caracteres.");
        valido = false;
      }

      // Evita el envío si hay algún error
      if (!valido) {
        e.preventDefault();
      }
    });
  }

  // ====================================================
  // FUNCIONES AUXILIARES Y REGLAS DE NEGOCIO
  // ====================================================

  // Comprueba que el correo termine en los dominios permitidos por la rúbrica
  function validarCorreo(email) {
    if (!email || email.length > 100) return false;
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    return dominiosPermitidos.some((dominio) => email.toLowerCase().endsWith(dominio));
  }

  // Muestra el mensaje de error directamente debajo del input
  function mostrarError(elemento, mensaje) {
    if (!elemento) return;
    elemento.classList.add("is-invalid");
    const divError = document.createElement("small");
    divError.className = "error-message text-danger mt-1 d-block";
    divError.style.color = "red";
    divError.textContent = mensaje;
    elemento.insertAdjacentElement("afterend", divError);
  }

  // Limpia los mensajes de error previos
  function limpiarErrores(formulario) {
    formulario.querySelectorAll(".error-message").forEach((e) => e.remove());
    formulario.querySelectorAll(".is-invalid").forEach((e) => e.classList.remove("is-invalid"));
  }
});