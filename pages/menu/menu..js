import { getMenuSeleccionado } from "../../services/local/guardarmenuesSemanal.js";
import hacerUnPedido from "../../services/web/hacerUnPedido.js";
import TarjetaOpcionMenuComponent from "../../ui/components/tarjetaOpcionMenu/tarjetaOpcionMenuComponent.js";

function pintarMenu()
{
    let menuActual = getMenuSeleccionado();

    setMenuId(menuActual);
    cargarOpciones(menuActual);

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

function setMenuId(menu)
{
    let menuIdParrafo = document.getElementById("menu_id");
    menuIdParrafo.textContent = menu.id;
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

pintarMenu();
