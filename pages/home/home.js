import ObtenerHistorialDeDosSemanas from "../../services/local/guardarHistorialReciente.js";
import { guardarMenues,obtenerMenuesLocal, obtenerMenuGuardado } from "/services/local/guardarMenuesSemanal.js";
import getMenuesSemana from "../../services/web/getMenuesSemana.js"
import TarjetaMenuComponent from "../../ui/components/tarjetaMenu/tarjetaMenuComponent.js";

function normalizarFecha(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

window.onload = async () => {

   let historialReciente = await ObtenerHistorialDeDosSemanas();
    
    let menuesLocal = obtenerMenuesLocal();

    if (menuesLocal === null) {
        await ObtenerMenuesWeb();
        menuesLocal = obtenerMenuesLocal();
    }

    let menues = Array.from(menuesLocal);
    agregarTarjetasMenu(menues);

    MostrarSiExistePedidoParaMenu(historialReciente,menues);
};


async function ObtenerMenuesWeb ()
{
    let response = await getMenuesSemana();

   if(!response.ok)
   {
        alert("ocurrio un problema");
   }

   let content = await response.json();
   let menues = Array.from(content.data);

   guardarMenues(menues);
} 

function agregarTarjetasMenu(menues)
{
     let listaTarjetas = new Array();

     menues.forEach((menu)=> {
          
          let tarjeta = TarjetaMenuComponent(menu);
          listaTarjetas.push(tarjeta);
   })

   let sectionMenues = document.getElementById("menues_semana");
   
   // Limpia el contenedor si ya tenía contenido
   sectionMenues.innerHTML = "";

   // Agrega cada tarjeta al contenedor
   listaTarjetas.forEach((tarjeta) => {
       if (typeof tarjeta === "string") {
           sectionMenues.innerHTML += tarjeta;
       } else {
           sectionMenues.appendChild(tarjeta);
       }
   });

    // Agregar listeners a los botones
    const botones = document.querySelectorAll(".btn-pedir");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idMenu = e.target.dataset.id;

            const menuGuardado = obtenerMenuGuardado(idMenu);
           irPaginaMenu();
        });
    });
}

function irPaginaMenu()
{
    window.location.href = '../menu/menu.html';
}

function MostrarSiExistePedidoParaMenu(pedidos, menues) {
  const confirmado = 1;

  // Fechas (YYYY-MM-DD) con pedido confirmado
  const fechasConfirmadas = new Set(
    pedidos
      .filter(p => p.estado === confirmado)
      .map(p => normalizarFecha(p.fechaEntrega))
  );

  // Para cada menú, decidí una sola vez su estado
  menues.forEach(m => {
    const fechaMenu = normalizarFecha(m.fechaConsumo);

    if (fechasConfirmadas.has(fechaMenu)) {

        let pedido = pedidos
      .filter(p => p.estado === confirmado)
      .filter(p => p.fechaEntrega === m.fechaConsumo)

      pintarMenuConfirmado(m.id,pedido);
    } else {
      pintarMenuSinConfirmar(m.id);
    }
  });
}


function pintarMenuConfirmado(menuId,pedido)
{  
    let descripcionPedido = pedido[0].items[0].descripcion;

    let tarjetaMenu = document.getElementById(menuId);

    if (tarjetaMenu) {
        let alerta = tarjetaMenu.querySelector('.texto-confirmado');
        if (alerta) {
            alerta.textContent = 'confirmado'
            alerta.classList.remove('menu-sin-confirmar');
            alerta.classList.add('menu-confirmado');
        }
    }

    const contenedorPedido = tarjetaMenu.querySelector('.item-pedido');
    if (contenedorPedido) {
        contenedorPedido.textContent = descripcionPedido;
    }
}

function pintarMenuSinConfirmar(menuId)
{  
    let tarjetaMenu = document.getElementById(menuId);

    if (tarjetaMenu) {
        let alerta = tarjetaMenu.querySelector('.texto-confirmado');
        if (alerta) {
            alerta.textContent = 'sin pedir'
            alerta.classList.remove('menu-confirmado');
            alerta.classList.add('menu-sin-confirmar');
        }
    }

    const contenedorPedido = tarjetaMenu.querySelector('.item-pedido');
    if (contenedorPedido) {
        contenedorPedido.innerHTML = '';
    }

}

