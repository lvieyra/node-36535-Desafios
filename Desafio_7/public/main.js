
const socket = io();
console.log('Se levanto socket')
async function pintar(productos) {
    const template = await fetch('plantillas/productos.hbs');
    const textTemplate = await template.text()
    const compile = await Handlebars.compile(textTemplate);
    const templateHtml = compile({productos});
    document.querySelector('#productos').innerHTML = templateHtml;
}
socket.on('productos', (data)=>{
    console.log(data);
    pintar(data)
});

const agregarProductos = document.querySelector('#agregarProducto'); 
agregarProductos.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const producto = {
		title: document.querySelector('#title').value,
		price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
	}
    agregarProductos.reset()
    socket.emit('agregarProducto', producto);
});

const agregarMensajes = document.querySelector('#agregarMensajes');
agregarMensajes.addEventListener('submit', (e)=>{
    e.preventDefault();
     const mensaje ={
        usermail: document.querySelector('#email').value,
        fecha: new Date().toLocaleString('es-AR'),
        mensaje: document.querySelector('#message').value
     }
     agregarMensajes.reset();
     socket.emit('agregarMensaje',mensaje);
}); 

 function rends(mensajes) {
   
    const html=  mensajes.map( mensaje =>{
        return `<div>
              <strong>${mensaje.usermail}</strong>
              <span>${mensaje.fecha}</span> 
              <em>${mensaje.mensaje}</em>
        </div>`;
    }).join('');
    document.querySelector('#mensajes').innerHTML = html;
    return  false          
}


socket.on('mensajes',  data =>{
    
     rends(data)
});