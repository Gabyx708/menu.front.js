import API_URL from "../../config/ApiConfig.js"


const getMenuesSemana = async () => 
{
    const endpoint = `${API_URL}/menu`;

    const response = await fetch(endpoint);
    return response;
}

export default getMenuesSemana;