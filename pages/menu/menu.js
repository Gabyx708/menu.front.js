import convertirFechaStr from "/utils/convertirFechaStr.js";
import { ObtenerHistorialRecienteLoca } from "/services/local/guardarHistorialReciente.js";
import { getMenuSeleccionado } from "/services/local/guardarmenuesSemanal.js";
import { guardarPedidoLocal } from "/services/local/guardarPedido.js";
import hacerUnPedido from "/services/web/hacerUnPedido.js";
import TarjetaOpcionMenuComponent from "/ui/components/tarjetaOpcionMenu/tarjetaOpcionMenuComponent.js";

function pintarMenu()
{
    let menuActual = getMenuSeleccionado();

    cargarOpciones(menuActual);
    setDatosMenu(menuActual);
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

    if(new Date() > fechaCierre)
    {
        MostrarMenuCerrado();
    }

    MostrarSiExistePedido(menu);
}


async function prepararPeticion(idMenu,idPlato)
{
    Swal.fire({
        title: "quieres confirmar tu pedio?",
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

const hacerPeticion = async(idMenu,idPlato) => {

    let response = await hacerUnPedido(idMenu,idPlato);
    let responseContent = await response.json();


    if(response.ok)
    {

        Swal.fire({
            title: "pedido exitoso!",
            text: `se creo el pedido: ${responseContent.data.id}`,
            icon: "success"
          });

          await guardarPedidoLocal(responseContent.data);
          location.href = "/pages/pedido/pedido.html";
          
    }

    if(!response.ok)
    {
            Swal.fire({
                title: "ocurrio un problema!",
                icon: "error",
                text: `${responseContent.message}`
            })
    }
}

function MostrarMenuCerrado() {

    let opciones = document.getElementsByClassName("tarjeta-opcion");
    const alerta = document.getElementById("alerta-menu-cerrado");

    if (alerta) {
        alerta.style.display = "block"; 
    }

    Array.from(opciones).forEach((tarjeta) => {
        tarjeta.classList.add("sin-stock");
    });
}


pintarMenu();


function MostrarSiExistePedido(menu)
{
    let pedidos = ObtenerHistorialRecienteLoca();

    let pedidosConfirmados = Array.from(pedidos).filter(p => p.estado === 1);

    pedidosConfirmados.forEach((p) => {

       let fechaConsumoMenu = new Date(menu.fechaConsumo);
       let fechaEntregaPedido = new Date(p.fechaEntrega);

       if(fechaConsumoMenu.getDate() == fechaEntregaPedido.getDate())
       {
            const alerta = document.getElementById("alerta-menu-cerrado");
            let opciones = document.getElementsByClassName("tarjeta-opcion");


            if (alerta) {
                alerta.style.display = "block";
                alerta.textContent = "YA HICISTE UN PEDIDO" 
                alerta.style.backgroundColor = "green"

                
                Array.from(opciones).forEach((tarjeta) => {
                tarjeta.classList.add("sin-stock");
                });
            }
       }
    })
}