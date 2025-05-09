const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DIAS = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];


export default function convertirFechaStr(fechaConvertir,esResumida = false) 
{  
    let fecha = new Date(fechaConvertir);

    let dia = fecha.getDay();
    let diaMes = fecha.getDate();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();

    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();

    let fechaString = `${DIAS[dia]} ${diaMes} <br> ${MESES[month]}` 

    if(esResumida)
    {
        fechaString = `${DIAS[dia]} ${diaMes}`
    }


    return fechaString.toUpperCase();
}