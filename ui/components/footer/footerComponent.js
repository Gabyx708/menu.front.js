export default function FooterComponent() {
    const footer = document.querySelector("footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-container">
            <p>&copy; 2025 Mi Aplicación. Todos los derechos reservados.</p>
        </div>
    `;
}