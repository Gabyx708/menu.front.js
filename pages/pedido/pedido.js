import { obtenerPedido } from "../../services/local/guardarPedido.js";
import cancelarPedido from "../../services/web/eliminarPedido.js";

const pedido = obtenerPedido();

// Mostrar información general
document.getElementById("pedido_id").textContent = pedido.id;
document.getElementById("cliente_nombre").textContent = pedido.nombre;
document.getElementById("cliente_dni").textContent = pedido.dni;
document.getElementById("fecha_entrega").textContent = formatearFecha(pedido.fechaEntrega);
document.getElementById("fecha_pedido").textContent = formatearFecha(pedido.fecha);
document.getElementById("estado_pedido").textContent = traducirEstado(pedido.estado);

// Mostrar ítems
const $listaItems = document.getElementById("lista_items");
pedido.items.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.descripcion} x${item.cantidad} - $${item.precio}`;
  $listaItems.appendChild(li);
});

// Mostrar movimientos
const $listaMovimientos = document.getElementById("lista_movimientos");
pedido.movimientos.forEach(mov => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${formatearFecha(mov.fecha)}</strong>: ${mov.descripcion} (${traducirEstado(mov.estadoInicial)} → ${traducirEstado(mov.estadoFinal)})`;
  $listaMovimientos.appendChild(li);
});

// Mostrar recibo
if (pedido.recibo) {
  document.getElementById("recibo_id").textContent = pedido.recibo.idRecibo;
  document.getElementById("recibo_total").textContent = pedido.recibo.total.toFixed(2);
  document.getElementById("recibo_fecha").textContent = formatearFecha(pedido.recibo.fechaRecibo);
}

// Funciones auxiliares
function formatearFecha(isoString) {
  const fecha = new Date(isoString);
  return fecha.toLocaleString("es-AR"); // Cambia según tu región
}

function traducirEstado(estado) {
  const estados = {
    0: "Creado",
    1: "Confirmado",
    2: "Cancelado",
  };
  return estados[estado] ?? "Desconocido";
}

/*cancelar pedido */
const $btnCancelar = document.getElementById("btn_cancelar_pedido");

if ($btnCancelar && pedido.estado !== 2) { // Solo si el pedido NO está cancelado
  $btnCancelar.addEventListener("click", async () => 
    {
        await MostarPopUpCancelar();
    })
               
} else if ($btnCancelar) {
  $btnCancelar.disabled = true;
  $btnCancelar.style.backgroundColor = "grey";
  $btnCancelar.style.cursor = "not-allowed";
  $btnCancelar.textContent = "pedido cancelado";
}


async function MostarPopUpCancelar()
{
    const confirmacion = confirm("¿Estás seguro de que querés cancelar este pedido?");
    if (!confirmacion) return;

      const response = await cancelarPedido(pedido.id);

      if (response.ok)
        {
            let responseContent = await response.json();
            
            if(!responseContent.isSuccess)
            {
                alert(responseContent.message);
                return;
            }

            alert(responseContent.message);
            location.reload();
        }
}