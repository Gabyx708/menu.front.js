export default function CerrarSesion()
{  
    sessionStorage.clear();
    localStorage.clear();

    location.href = "../index.html";
}