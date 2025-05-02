import API_URL from "../../config/ApiConfig.js";
import { getToken } from "../local/guardarUsuario.js"


const hacerUnPedido = async (idMenu,idPlato) => 
{
    const jwt = getToken();
    const endpoint = `${API_URL}/pedido`;

    const requestBody = {
        idMenu : idMenu,
        items : [
            {idPlato: idPlato , cantidad: "1"}
        ]
    }

    const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody),
      }

    let response = await fetch(endpoint,request);
    return response;
}

export default hacerUnPedido; 