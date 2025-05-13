function guardarUsuarioActual(usuario) {

    guardarToken(usuario.token);
    sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function guardarToken(token) {
    
    sessionStorage.setItem("JWT", token);
    guardarDni();
}

function getToken()
{
    return sessionStorage.getItem("JWT");
}

function getDni()
{
    return sessionStorage.getItem("dni");
}

function getUsuarioActual()
{
    let usuario = sessionStorage.getItem("usuarioActual");
    return JSON.parse(usuario);
}

function guardarDni() {
    const token = getToken();

    if (!token) return;

    const payload = parseJwt(token);
    
    if (payload && payload.id) {
        sessionStorage.setItem("dni", payload.id);
    } else {
        console.warn("El token no contiene un campo 'id'");
        sessionStorage.setItem("dni", "");
    }
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Token inválido:", e);
        return null;
    }
}

export { guardarUsuarioActual,getToken,getUsuarioActual,getDni };
