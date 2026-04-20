import getGastosMes from "../../services/web/getGastosMes.js"

window.onload = async () =>
{
    let response = await getGastosMes();

    let responseJson = await response.json();

    let dataGastos = responseJson.data;

    PintarDatosGastos(dataGastos);
}



function PintarDatosGastos(dataGastos)
{  
    let montoTotal = dataGastos.montos.montoTotal;
    let montoDescontar = dataGastos.montos.montoApagar;

    let pedidosCompletados = dataGastos.montos.cantidadPedidosConfirmados;
    let pedidosCancelados = dataGastos.montos.cantidadPedidosCancelados;
    console.log(dataGastos);


    let montoTotalStr = "$"+new Intl.NumberFormat("es-AR").format(montoTotal);
    let montoDescontarStr = "$"+new Intl.NumberFormat("es-AR").format(montoDescontar);


    document.getElementById("monto-total").textContent = montoTotalStr;
    document.getElementById("monto-descontar").textContent = montoDescontarStr;

    document.getElementById("cant-pedidos-completados").textContent = pedidosCompletados;
    document.getElementById("cant-pedidos-cancelados").textContent = pedidosCancelados;

}