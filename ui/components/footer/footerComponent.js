export default function FooterComponent() {
    const footer = document.querySelector("footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-container">
            <p>&copy; 2025 Menu. v: web.2.0.0</p>
        </div>
    `;
}