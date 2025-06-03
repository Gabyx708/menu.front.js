import { getPedidosSegunFechaConsumo } from "/services/web/getPedidosSegunFechaConsumo.js";

export default async function ObtenerHistorialReciente()
{
    let historial = sessionStorage.getItem("reciente");
    
    if(historial)
    {
        return await JSON.parse(historial);
    }

    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay();
    const diasHastaLunes = (diaSemana + 6) % 7; // convierte domingo (0) en 6, lunes (1) en 0, etc.

    const lunesInicioSemana = new Date(fechaActual);
    lunesInicioSemana.setDate(fechaActual.getDate() - diasHastaLunes);
    const lunesSiguiente = new Date(lunesInicioSemana);
    lunesSiguiente.setDate(lunesInicioSemana.getDate() + 7);

    console.log("Lunes de esta semana:", lunesInicioSemana);
    console.log("Lunes de la próxima semana:", lunesSiguiente);

    let responseHistorial = await getPedidosSegunFechaConsumo(lunesInicioSemana,lunesSiguiente);
    let data = await responseHistorial.json();
    
    let pedidos = data.data.resultados;

    sessionStorage.setItem('reciente',JSON.stringify(pedidos));

    return pedidos;
}