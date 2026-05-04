import convertirFechaStr from "/utils/convertirFechaStr.js";
import { getMenuSeleccionado } from "/services/local/guardarMenuesSemanal.js";
import { guardarPedidoLocal } from "/services/local/guardarPedido.js";
import hacerUnPedido from "/services/web/hacerUnPedido.js";
import TarjetaOpcionMenuComponent from "/ui/components/tarjetaOpcionMenu/tarjetaOpcionMenuComponent.js";
import ObtenerHistorialDeDosSemanas from "/services/local/guardarHistorialReciente.js";
import { borrarHistorialLocal } from "/services/local/guardarHistorialReciente.js";

async function pintarMenu()
{
    let existeUnPedidoParaElMenu = await confirmarSiExisteUnPedido()
    let menuActual = await getMenuSeleccionado();

    setDatosMenu(menuActual);
    cargarOpciones(menuActual);

      await new Promise(requestAnimationFrame);

  const fechaCierre = new Date(menuActual.fechaCierre);
  const yaCerro = new Date() > fechaCierre;

  if (yaCerro || existeUnPedidoParaElMenu) {
    MostrarMenuCerrado( existeUnPedidoParaElMenu ? "YA SE HIZO UN PEDIDO" : "MENU CERRADO" );
  }

  if(existeUnPedidoParaElMenu)
  {
    MostrarPedidoHecho()
  }
}


function cargarOpciones(menu)
{
    let opciones = menu.opciones;
    let seccionOpciones = document.getElementById('opciones_menu');

    let listaOpciones = Array.from(opciones);
    let listaTarjetasOpcion = new Array();

    listaOpciones.forEach((opcion)=>{

            let tarjeta = TarjetaOpcionMenuComponent(opcion);
            listaTarjetasOpcion.push(tarjeta);
    })

    // Agrega cada tarjeta al contenedor
    listaTarjetasOpcion.forEach((tarjeta) => {
    if (typeof tarjeta === "string") {
        seccionOpciones.innerHTML += tarjeta;
    } else {
        seccionOpciones.appendChild(tarjeta);
    }
});

// Agregar listeners a los botones
const botones = document.querySelectorAll(".btn-pedir-opcion");
botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const idPlato = e.target.dataset.id;
        
        prepararPeticion(menu.id,idPlato);
    });
});

}

function setDatosMenu(menu)
{
    let menuIdParrafo = document.getElementById("menu_id");
    menuIdParrafo.textContent = menu.id;

   
    let fechaConsumo = new Date(menu.fechaConsumo);
    let fechaCierre = new Date(menu.fechaCierre);

    document.getElementById("fecha_consumo").innerHTML = convertirFechaStr(fechaConsumo,false);
    document.getElementById("fecha_cierre").innerHTML = convertirFechaStr(fechaCierre,true,true)+" hs";
}


async function prepararPeticion(idMenu,idPlato)
{
    Swal.fire({
        title: "quieres confirmar tu pedido?",
        showCancelButton: true,
        icon: "info",
        confirmButtonText: "confirmar",
        denyButtonText: `cancelar`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
           await hacerPeticion(idMenu,idPlato);
        } 

      });
}

const hacerPeticion = async (idMenu, idPlato) => {

  // Mostrar spinner de carga antes de la petición
  Swal.fire({
    title: "Realizando pedido...",
    html: "Por favor, espere un momento <b></b>",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(); 
    }
  });

  try {
    const response = await hacerUnPedido(idMenu, idPlato);
    const responseContent = await response.json();

    if (response.ok) {
     
      await Swal.fire({
        title: "¡Pedido exitoso!",
        text: `Se creó el pedido: ${responseContent.data.id}`,
        icon: "success",
        confirmButtonText: "OK"
      });

      await guardarPedidoLocal(responseContent.data);
      borrarHistorialLocal();

      location.href = "/pages/pedido/pedido.html";
    } else {
      
      Swal.fire({
        title: "Ocurrió un problema",
        icon: "error",
        text: responseContent.message || "No se pudo crear el pedido."
      });
    }

  } catch (error) {

    Swal.fire({
      title: "Error de red",
      text: "No se pudo conectar con el servidor.",
      icon: "error"
    });
  }
};


function MostrarMenuCerrado(mensaje = "MENU CERRADO") {

  const tarjetas = document.querySelectorAll(".tarjeta-opcion");
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add("sin-stock");
    // Deshabilitar botones dentro de la tarjeta
    tarjeta.querySelectorAll(".btn-pedir-opcion").forEach(btn => {
      btn.disabled = true;
      btn.classList.add("disabled");
      btn.setAttribute("aria-disabled", "true");
    });
  });

  const alerta = document.getElementById("alerta-menu-cerrado");
  if (alerta) {
    alerta.style.display = "block";
    alerta.textContent = mensaje;
  }
}



pintarMenu();


function MostrarSiExistePedido()
{
  MostrarMenuCerrado()
  const alerta = document.getElementById("alerta-menu-cerrado");
  alerta.textContent = 'YA SE HIZO UN PEDIDO'
}

async function confirmarSiExisteUnPedido()
{
   let menuActual =  await getMenuSeleccionado();

   let historial = await ObtenerHistorialDeDosSemanas()
   let pedido = historial.filter(p=> p.estado == 1)
                        .filter(p => new Date(p.fechaEntrega).getDate() == new Date(menuActual.fechaConsumo).getDate())

   if(pedido.length === 0)
   {
      return false;
   }
   return true;
  
}

async function MostrarPedidoHecho() {
  
  let alertaPedidHecho = document.getElementById("alerta-pedido-hecho")
  alertaPedidHecho.style.display = "block"

  let menuActual = await getMenuSeleccionado();
  let historial = await ObtenerHistorialDeDosSemanas();

  let pedido = historial
    .filter(p => p.estado == 1)
    .filter(p => 
      new Date(p.fechaEntrega).toDateString() === 
      new Date(menuActual.fechaConsumo).toDateString()
    );

  console.log(pedido);

  if (pedido.length === 0) return;

  let pedidoActual = pedido[0];

  // Contenedor
  let contenedor = document.getElementById("lista-comida");
  contenedor.innerHTML = "";

  // Render de items
  pedidoActual.items.forEach(item => {
    let linea = document.createElement("p");
    linea.textContent = `${item.cantidad}x ${item.descripcion} - $${item.precio}`;
    contenedor.appendChild(linea);
  });

  // Mostrar total
  let total = document.createElement("p");
  total.innerHTML = `<strong>Total: $${pedidoActual.montoTotal}</strong>`;
  contenedor.appendChild(total);

  // Botón cancelar
  document.getElementById("btn-cancelar-pedido").onclick = async () => {
    let confirmar = confirm("¿Seguro que querés cancelar el pedido?");
    if (!confirmar) return;

    await CancelarPedido(pedidoActual.id);

    alert("Pedido cancelado");
    
    // opcional: refrescar UI
    contenedor.innerHTML = "";
  };
}