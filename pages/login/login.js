import iniciarSesion from "../../services/web/IniciarSesion.js";
import { guardarUsuarioActual } from "../../services/local/guardarUsuario.js";

let btnIniciarSesion = document.getElementById("BtnIniciarSesion")

btnIniciarSesion.addEventListener("click",async function (event) {
    event.preventDefault(); // 🔥 Esto evita el reload automático
    await iniciarSesionWeb();
});



async function  iniciarSesionWeb()
{

    let dniUsuario = document.getElementById("InputDniUsuario").value;
    let password = document.getElementById("InputPasswordUsuario").value;

    let response = await iniciarSesion(dniUsuario,password);
    
    if (!response.ok) {

        alert("credenciales incorrectas");
        return;
    } 

    const data = await response.json();

    guardarUsuarioActual(data.data);
    irPaginaHome();
}

function irPaginaHome()
{
    window.location.href = '../home/home.html';
}