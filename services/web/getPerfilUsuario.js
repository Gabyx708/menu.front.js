import API_URL from "../../config/ApiConfig";
import { getToken } from "../local/guardarUsuario.js";

export async function getPerfilUsuario(dni) 
{
    const jwt = getToken();
    const endpoint = `${API_URL}/usuario/${dni}`;

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