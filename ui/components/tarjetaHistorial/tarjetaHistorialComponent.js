export default function TarjetaHistorialComponent(pedido) {
    const estadoTexto = pedido.estado === 1 ? "CONFIRMADO" : "CANCELADO";
    const claseEstado = pedido.estado === 1 ? "estado-confirmado" : "estado-cancelado";

    return `
        <div class="tarjeta-historial" id=${pedido.id}>
            <h5>ID: ${pedido.id}</h5>
            <hr>
            <p><strong>Fecha:</strong> ${new Date(pedido.fecha).toLocaleDateString()}</p>
            <p><strong>Monto total:</strong> $${pedido.montoTotal.toFixed(2)}</p>
            <div class="estado ${claseEstado}">${estadoTexto}</div>
        </div>
    `;
}
