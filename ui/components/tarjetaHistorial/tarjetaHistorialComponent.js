import convertirFechaStr from "../../../utils/convertirFechaStr.js";

export default function TarjetaHistorialComponent(pedido) {
    const estadoTexto = pedido.estado === 1 ? "CONFIRMADO" : "CANCELADO";
    const claseEstado = pedido.estado === 1 ? "estado-confirmado" : "estado-cancelado";

    return `
        <div class="tarjeta-historial" id=${pedido.id}>
            <h3> ${convertirFechaStr(pedido.fechaEntrega,true)}</h3>
            <hr>
            <br>
            <div class="pedido-data">
                <p>Se pidio:${new Date(pedido.fecha).toLocaleDateString()}</p>
                <p>ID:${pedido.id}</p>
            <div/>
            <div class="estado ${claseEstado}">${estadoTexto}</div>
        </div>
    `;
}
