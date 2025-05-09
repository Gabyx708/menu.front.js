export default function HeaderComponent() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
    <nav class="header-nav">
        <ul class="nav-list">
            ${crearPestaña("Home", "house.png", "/pages/home/home.html")}
            ${crearPestaña("Mi historial", "clock.png", "/pages/historial/historial.html")}
            ${crearPestaña("Mi perfil", "userWhite.png", "/pages/perfil/perfil.html")}
            ${crearPestaña("Cerrar sesión", "exit.png", "/index.html")}
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

function crearPestaña(texto, nombreImagen, href) {
    return `
        <li class="nav-item">
            <button class="nav-button" data-href="${href}">
                <img src="/img/${nombreImagen}" alt="${texto}" />
                <span>${texto}</span>
            </button>
        </li>
    `;
}

