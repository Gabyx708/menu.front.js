import convertirFechaStr from "../../../utils/convertirFechaStr.js";

export default function TarjetaMenuComponent(menu) {
    const fechaConsumo = new Date(menu.fechaConsumo);
    const fechaCierre = new Date(menu.fechaCierre);

    const diaConsumo = String(fechaConsumo.getDate()).padStart(2, '0');
    const mesConsumo = String(fechaConsumo.getMonth() + 1).padStart(2, '0');

    const diaCierre = String(fechaCierre.getDate()).padStart(2, '0');
    const mesCierre = String(fechaCierre.getMonth() + 1).padStart(2, '0');
    const horaCierre = String(fechaCierre.getHours()).padStart(2, '0');
    const minutoCierre = String(fechaCierre.getMinutes()).padStart(2, '0');

    const fechaConsumoStr = convertirFechaStr(fechaConsumo);
    return `
    <div id="${menu.id}" class="tarjeta-menu">
        <p><strong>${fechaConsumoStr}</strong></p>
        <hr>
        <p><strong>Fecha cierre:</strong> ${diaCierre}/${mesCierre} ${horaCierre}:${minutoCierre} hs</p>
        <p class="menu_id"><strong>ID:</strong> ${menu.id}</p>
        <button class="btn-pedir" data-id="${menu.id}">PEDIR</button>
    </div>
`;

}
