import API_URL from "../../config/ApiConfig.js";
import { getToken } from "../local/guardarUsuario.js";

export async function cambiarPassword(passwordOriginal,nuevaPassword)
{
    const jwt = getToken();
    const endpoint = `${API_URL}/usuario/change-password`;

    const requestContent = 
    {
        originalPassword: passwordOriginal,
        newPassword: nuevaPassword
    };

    const request = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        },
         body: JSON.stringify(requestContent)
      }

      const response = await fetch(endpoint,request);
      return response;
}