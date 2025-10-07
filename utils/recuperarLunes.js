export function obtenerLunesSemanaActual()
{
    const fechaActual = new Date();
    const diaActual = fechaActual.getDay();

    const diasDesdeLunes = (diaActual + 6) % 7;

    const lunesReciente = new Date(fechaActual)
          lunesReciente.setDate(fechaActual.getDate() - diasDesdeLunes);
    
    return lunesReciente;
}

export function obtenerLunesDentroDeDosSemanas()
{
    const dosSemanas = 14;
    let lunesReciente = obtenerLunesSemanaActual()

    const lunesEnDosSemanas = new Date(lunesReciente)
          lunesEnDosSemanas.setDate(lunesReciente.getDate() + dosSemanas);
          
    return lunesEnDosSemanas;
}