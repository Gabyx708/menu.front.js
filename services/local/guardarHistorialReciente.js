import { obtenerLunesSemanaActual,obtenerLunesDentroDeDosSemanas } from "/utils/recuperarLunes.js";
import { getPedidosSegunFechaConsumo } from "/services/web/getPedidosSegunFechaConsumo.js";

export default async function ObtenerHistorialDeDosSemanas()
{
    let historialLocal = ObtenerHistorialRecienteLocal();

    if(historialLocal)
    {
        return historialLocal;
    }

    const lunesReciente =  obtenerLunesSemanaActual();
    const lunesEnDosSemanas = obtenerLunesDentroDeDosSemanas();

    let historialPedidos = await recuperarHistorialSegunPeriodo(lunesReciente,lunesEnDosSemanas)

    guardarHistorialEnLocal(historialPedidos)

    return historialPedidos;
}


function ObtenerHistorialRecienteLocal()
{  
    return JSON.parse(sessionStorage.getItem('historial'));
}


function guardarHistorialEnLocal(historial)
{
    sessionStorage.setItem('historial',JSON.stringify(historial));
}

async function recuperarHistorialSegunPeriodo(inicio,fin)
{
    let responseHistorial = await getPedidosSegunFechaConsumo(inicio,fin);
    let data = await responseHistorial.json();
    
    let historialPedidos = data.data.resultados;

    return historialPedidos;
}

export function borrarHistorialLocal()
{
  sessionStorage.removeItem('historial')
}