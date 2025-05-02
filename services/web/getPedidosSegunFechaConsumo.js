import { getToken } from "../local/guardarUsuario.js";

export  async function getPedidosSegunFechaConsumo(fechaInicio,fechaFin)
{
    const jwt = getToken();

    let fechaInicioStr =  new Date(fechaInicio).toISOString();
    let fechaFinStr =  new Date(fechaFin).toISOString();

    const endpoint =  `${API_URL}/pedido?fechaInicio=${fechaInicioStr}&fechaFin=${fechaFinStr}`;

    const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        }
      }

    let response = await fetch(endpoint,request);
    return response;
}

export  async function getPedidosSegunFechaConsumo()
{
    const jwt = getToken();

    let fechaActual = new Date();

    
    let fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    let fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    let fechaInicioStr =  fechaInicio.toISOString();
    let fechaFinStr =  fechaFin.toISOString();

    const endpoint =  `${API_URL}/pedido?fechaInicio=${fechaInicioStr}&fechaFin=${fechaFinStr}`;

    const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        }
      }

    let response = await fetch(endpoint,request);
    return response;
}