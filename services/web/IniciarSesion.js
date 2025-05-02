import API_URL from "../../config/ApiConfig.js";

const  iniciarSesion = async(dniUsuario,passwordUsuario) =>
{  

    const requestBody = {
        dni: dniUsuario,
        password: passwordUsuario
    } 

    const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    
    let endpoint = `${API_URL}/autenticacion/login`;

    const response = await fetch(endpoint,request);
    return response;
}

export default iniciarSesion;