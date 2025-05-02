export default function HeaderComponent() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
        <nav class="header-nav">
            <ul class="nav-list">
                ${crearPestaña("Home", "🏠", "/pages/home/home.html")}
                ${crearPestaña("Mis pedidos", "🧾", "/pages/pedidos/pedidos.html")}
                ${crearPestaña("Menú semanal", "📅", "/pages/menues/menues.html")}
                ${crearPestaña("Mi perfil", "👤", "/pages/perfil/perfil.html")}
                ${crearPestaña("Cerrar sesión", "🚪", "/pages/login/login.html")}
            </ul>
        </nav>
    `;

    // Asignar evento click a cada botón
    const botones = header.querySelectorAll(".nav-button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const destino = boton.dataset.href;
            if (destino) {
                window.location.href = destino;
            }
        });
    });
}

function crearPestaña(texto, icono, href) {
    return `
        <li class="nav-item">
            <button class="nav-button" data-href="${href}">
                <span class="nav-icon">${icono}</span>
                <span>${texto}</span>
            </button>
        </li>
    `;
}
