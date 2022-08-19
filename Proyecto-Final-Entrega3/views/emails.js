const getItem = (item) => {
    return `
        <div>
            <div data-id="${item.id}">
                <h3>Producto: ${item.titulo}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p >$ ${item.precio}</p>
                <p>Subtotal: ${item.subto}</p>
            </div>
        </div>
    `;
}

module.exports = {
    getItem,
}