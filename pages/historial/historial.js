import { guardarPedidoLocal } from "../../services/local/guardarPedido.js";
import getPedidoById from "../../services/web/getPedidoById.js";
import { getPedidosSegunFechaConsumo } from "../../services/web/getPedidosSegunFechaConsumo.js";
import TarjetaHistorialComponent from "../../ui/components/tarjetaHistorial/tarjetaHistorialComponent.js";

const $resultado = document.getElementById("resultado_pedidos");
const $fechaInicio = document.getElementById("fecha_inicio");
const $fechaFin = document.getElementById("fecha_fin");
const $btnFiltrar = document.getElementById("btn_filtrar");
const $paginaActual = document.getElementById("pagina_actual");
const $totalPaginas = document.getElementById("total_paginas");
const $btnAnterior = document.getElementById("pagina_anterior");
const $btnSiguiente = document.getElementById("pagina_siguiente");

let paginaActual = 1;
let totalPaginas = 1;

async function cargarHistorial() {

    let inicio = $fechaInicio.value;
    let fin = $fechaFin.value;

    if (!inicio || !fin) {

        const hoy = new Date();
    
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0); // Último día del mes actual
    
        inicio = inicioMes
        fin = finMes;
    
        // Opcional: rellenar inputs visualmente
        $fechaInicio.value = inicioMes.toISOString().split('T')[0];
        $fechaFin.value = finMes.toISOString().split('T')[0];;
    }

    const response = await getPedidosSegunFechaConsumo(inicio, fin, paginaActual);
    
    if(!response.ok)
    {
        alert("ocurrio un problema");
        return;
    }

    let data = await response.json();
    let listaPedidos = data.data.resultados;
 
    $resultado.innerHTML = "";

    if (listaPedidos.length > 0) {

        listaPedidos.forEach(pedido => {
            $resultado.innerHTML += TarjetaHistorialComponent(pedido);
            agregarClickTarjetaHistorial();
        });

        totalPaginas = Math.ceil(data.data.totalResultados / data.data.tamanoPagina);
        actualizarPaginado();
    } else {
        $resultado.innerHTML = "<p>No se encontraron pedidos para ese rango de fechas.</p>";
        totalPaginas = 1;
        actualizarPaginado();
    }
}

function actualizarPaginado() {
    $paginaActual.textContent = paginaActual;
    $totalPaginas.textContent = totalPaginas;
}

// Eventos
$btnFiltrar.addEventListener("click", () => {
    paginaActual = 1;
    cargarHistorial();
});

$btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarHistorial();
    }
});

$btnSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
        paginaActual++;
        cargarHistorial();
    }
});

function agregarClickTarjetaHistorial() {
    const listaTarjetas = document.getElementsByClassName("tarjeta-historial");

    Array.from(listaTarjetas).forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            
            let idPedido = tarjeta.getAttribute('id');
            ObtenerDatosPedido(idPedido);
        });
    });
}

async function ObtenerDatosPedido(idPedido)
{
    let response = await getPedidoById(idPedido);

    if(!response.ok)
    {
        alert("error al recuperar el pedido");
    }

    const data = await response.json();
    guardarPedidoLocal(data.data);
}
window.onload = async () =>
{
    cargarHistorial();
}