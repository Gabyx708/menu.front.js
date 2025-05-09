import { guardarMenues,obtenerMenuesLocal, obtenerMenuGuardado } from "../../services/local/guardarmenuesSemanal.js";
import getMenuesSemana from "../../services/web/getMenuesSemana.js"
import TarjetaMenuComponent from "../../ui/components/tarjetaMenu/tarjetaMenuComponent.js";

window.onload = async() =>
{
    let menuesLocal = obtenerMenuesLocal();


   if(menuesLocal === null)
   {
         await ObtenerMenuesWeb();
   }


   let menues = Array.from(menuesLocal);
   agregarTarjetasMenu(menues);
}

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