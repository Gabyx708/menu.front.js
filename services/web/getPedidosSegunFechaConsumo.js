import API_URL from "../../config/ApiConfig.js";
import { getToken } from "../local/guardarUsuario.js";

export async function getPedidosSegunFechaConsumo(fechaInicio, fechaFin,index=1) {
    
  const jwt = getToken();

  if (!fechaInicio || !fechaFin) {
      const fechaActual = new Date();
      fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
      fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
  }

  const fechaInicioStr = new Date(fechaInicio).toISOString();
  const fechaFinStr = new Date(fechaFin).toISOString();

  const endpoint = `${API_URL}/pedido?fechaInicio=${fechaInicioStr}&fechaFin=${fechaFinStr}&indice=${index}`;

  const request = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
      }
  };

  let response = await fetch(endpoint, request);
  return response;
}
