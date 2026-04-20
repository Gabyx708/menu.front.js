import getGastosMes from "../../services/web/getGastosMes.js"

window.onload = async () => {

    const selectMes = document.getElementById("mes");

    // Mes actual automático
    const mesActual = new Date().getMonth() + 1;
    selectMes.value = mesActual;

    await cargarDatos(mesActual);

    // Evento cuando cambia el mes
    selectMes.addEventListener("change", async () => {
        const mesSeleccionado = selectMes.value;
        await cargarDatos(mesSeleccionado);
    });
};


async function cargarDatos(mes) {
    
    let response = await getGastosMes({ mes });
    let responseJson = await response.json();
    let dataGastos = responseJson.data;

    PintarDatosGastos(dataGastos);
}


function PintarDatosGastos(dataGastos) {  
    let montoTotal = dataGastos.montos.montoTotal;
    let montoDescontar = dataGastos.montos.montoApagar;

    let pedidosCompletados = dataGastos.montos.cantidadPedidosConfirmados;
    let pedidosCancelados = dataGastos.montos.cantidadPedidosCancelados;

    let montoTotalStr = "$" + new Intl.NumberFormat("es-AR").format(montoTotal);
    let montoDescontarStr = "$" + new Intl.NumberFormat("es-AR").format(montoDescontar);

    document.getElementById("monto-total").textContent = montoTotalStr;
    document.getElementById("monto-descontar").textContent = montoDescontarStr;

    document.getElementById("cant-pedidos-completados").textContent = pedidosCompletados;
    document.getElementById("cant-pedidos-cancelados").textContent = pedidosCancelados;
}