
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

    console.log('Entre al boton enviar mensaje')
     const mensaje ={
        author: {
                id: document.querySelector('#email').value,
                nombre: document.querySelector('#nombre').value,
                apellido: document.querySelector('#apellido').value,
                edad: document.querySelector('#edad').value,
                alias: document.querySelector('#alias').value,
                avatar: document.querySelector('#avatar').value
        },
        text: document.querySelector('#message').value,
        fecha: new Date().toLocaleString('es-AR'),
        
     }
     agregarMensajes.reset();
     socket.emit('agregarMensaje',mensaje);
}); 


    function rends(mensajes) {
    const authorSchema = new normalizr.schema.Entity('authors')
    const messageSchema = new normalizr.schema.Entity('mensajes', {
      author: authorSchema,
    },{idAttribute:'_id'})
    const global = new normalizr.schema.Entity('global', {
      messages: [messageSchema],
    })    
    
    const dataDeno = normalizr.denormalize(mensajes.result,global,mensajes.entities)
console.log(dataDeno);
    const porcentajeReduccion = Math.floor(
        100 - (JSON.stringify(mensajes).length * 100) / JSON.stringify(dataDeno).length
        )
    
    document.getElementById('porcentaje').innerHTML = porcentajeReduccion;

    const html = dataDeno.messages.map(mensaje => {
       
        return `
            <div>
                <b style="color:blue;">${mensaje.author.id}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.text}</i>
                <img style="width: 30px; border-radius: 100%" src="${mensaje.author.avatar == '' ? 'https://www.gravatar.com/avatar/' : mensaje.author.avatar  }">
            </div>
        `
    }).join(" ");
      console.log(html);
      document.querySelector('#mensajes').innerHTML = html;
    return  false  
}


socket.on('mensajes',  data =>{
    
     rends(data)
});