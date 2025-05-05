function guardarPedidoLocal(pedido)
{
    sessionStorage.setItem('pedido',JSON.stringify(pedido));
}

function obtenerPedido()
{  
    let pedidoStr = sessionStorage.getItem('pedido');
    return JSON.parse(pedidoStr);
}

export {guardarPedidoLocal  , obtenerPedido}