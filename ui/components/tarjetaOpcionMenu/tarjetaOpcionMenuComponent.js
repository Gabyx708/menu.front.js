export default function TarjetaOpcionMenuComponent(opcion) {
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

    const precioFormateado = formatter.format(opcion.precio);
    const stockRestante = opcion.stock;
    const sinStock = opcion.stock === 0 ? ' sin-stock' : '';

    return `
        <div class="tarjeta-opcion${sinStock}">
            <p><strong>Descripción:</strong> ${opcion.descripcion}</p>
            <p><strong>Precio:</strong> ${precioFormateado}</p>
            <p><strong>Quedan:</strong> ${stockRestante}</p>
            <p><strong>Pedidos:</strong> ${opcion.solicitados}</p>
            <button class="btn-pedir-opcion" data-id="${opcion.idPlato}">PEDIR</button>
        </div>
    `;
}
