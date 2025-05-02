function guardarMenues(menues) 
{
    sessionStorage.setItem("menues", JSON.stringify(menues));
}

function obtenerMenuesLocal()
{
    let menues = sessionStorage.getItem("menues");
    return JSON.parse(menues);
}

function obtenerMenuGuardado(idMenu) {
    const menues = obtenerMenuesLocal();

    if (!Array.isArray(menues)) {
        console.error("Los menús locales no son válidos.");
        return null;
    }

    const menuEncontrado = menues.find(menu => menu.id === idMenu);

    setMenuSeleccionado(menuEncontrado);
    return menuEncontrado || null;
}

function setMenuSeleccionado(menu)
{
    sessionStorage.removeItem("menuSeleccionado");
    sessionStorage.setItem("menuSeleccionado",JSON.stringify(menu));
}

function getMenuSeleccionado()
{
    return JSON.parse(sessionStorage.getItem("menuSeleccionado"));
}

export {guardarMenues,obtenerMenuesLocal,obtenerMenuGuardado,getMenuSeleccionado};