const socket = io();

async function pintar(productos) {
    const template = await fetch('plantillas/productos.hbs');
    const textTemplate = await template.text()
    const compile = await Handlebars.compile(textTemplate);
    const templateHtml = compile({productos});
    document.querySelector('#productos').innerHTML = templateHtml;
    console.log(templateHtml);
}
socket.on('productos', (data)=>{
    console.log(data);
    pintar(data);
});

const agregarProductos = document.querySelector('#agregarProducto'); 
agregarProductos.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const producto = {
		title: document.querySelector('#title').value,
		price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
	}
    console.log(producto);
    agregarProductos.reset()
    socket.emit('agregarProducto', producto);
});