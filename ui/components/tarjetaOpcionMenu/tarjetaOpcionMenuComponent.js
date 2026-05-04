export default function TarjetaOpcionMenuComponent(opcion) {
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    });

    const precioFormateado = formatter.format(opcion.precio);
    const sinStock = opcion.stock === 0 ? ' sin-stock' : '';

    return `
        <div class="tarjeta-opcion${sinStock}">
            <h3>${opcion.descripcion.toUpperCase()}</h3>
            
            <p>${precioFormateado}</p>
            
            <p>Stock: ${opcion.stock}</p>
            <p>Pedidos: ${opcion.solicitados}</p>

            <button class="btn-pedir-opcion" data-id="${opcion.idPlato}">
                PEDIR
            </button>
        </div>
    `;
}