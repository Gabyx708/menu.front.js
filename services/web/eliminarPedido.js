import API_URL from "../../config/ApiConfig.js";
import { getToken } from "../local/guardarUsuario.js";

export default async function cancelarPedido(idPedido)
{
    const jwt = getToken();
    const endpoint = `${API_URL}/pedido?id=${idPedido}`;

    const request = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        },
      }
    
      const response = await fetch(endpoint,request);
      return response;
}