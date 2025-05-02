function guardarUsuarioActual(usuario) {

    guardarToken(usuario.token);
    sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function guardarToken(token) {
    sessionStorage.setItem("JWT", token);
}

function getToken()
{
    return sessionStorage.getItem("JWT");
}

function getUsuarioActual()
{
    let usuario = sessionStorage.getItem("usuarioActual");
    return JSON.parse(usuario);
}

export { guardarUsuarioActual,getToken,getUsuarioActual };