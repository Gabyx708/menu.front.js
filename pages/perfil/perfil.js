import { getUsuarioActual } from "../../services/local/guardarUsuario.js";
import { cambiarPassword } from "../../services/web/cambiarPassword.js";

const usuario = getUsuarioActual();

document.getElementById("apodo").textContent = usuario.apodo;
document.getElementById("nombres").textContent = usuario.nombre + " " + usuario.apellido;

document.getElementById("btnCambiarPassword").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modalPassword").classList.remove("hidden");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalPassword").classList.add("hidden");
});

document.getElementById("formCambiarPassword").addEventListener("submit", async (e) => {
    e.preventDefault();

    const actual = document.getElementById("passwordActual").value;
    const nueva = document.getElementById("nuevaPassword").value;

    if (nueva.length < 6) {
        alert("La nueva contraseña debe tener al menos 6 caracteres.");
        return;
    }

    try {
        // Acá llamás a tu servicio para cambiar la contraseña
        const response = await cambiarPassword(actual,nueva);

        if (response.ok) {
            alert("Contraseña actualizada correctamente.");
            document.getElementById("modalPassword").classList.add("hidden");

            location.href = "../../../index.html";
        } else {
            const err = await response.json();
            alert("Error: " + (err.message || "No se pudo cambiar la contraseña."));
        }

    } catch (error) {
        console.error(error);
        alert("Ocurrió un error.");
    }
});
