import API_URL from "../../config/ApiConfig.js";
import { getDni, getToken } from "../local/guardarUsuario.js";

export default async function getGastosMes() 
{
    const dni = getDni();
    const jwt = getToken();
    const endpoint = `${API_URL}/usuario/${dni}/gastos`;

    const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        },
      }
    
      const response = await fetch(endpoint,request);
      return response;
}
