// const CarritoDaoMongoDB = require('../dao/carrito/carritosDaoMongo.js')
// const carritoDao = new CarritoDaoMongoDB();
const {carritoSeleccionado : carrito}  = require('../dao/index.js')
const carritoDao = new carrito();
const agregaCarrito = async(req,res)=>{
    try{
       const id = await carritoDao.saveCarrito(req.body)
       res.status(200).json({id});

    } catch (error) {
        res.status(409).json({
            mensaje: 'El carrito ya exite ' + error.message
        });
    
    }
};
const eliminaCarrito = async (req,res)=>{

    try {
        
  
      const indice =  await carritoDao.deleteCarrito(req.params.id)
       
       if(indice != -1){
        res.status(200).json({
            ok: true,
            message: 'El carrito fue eliminado'
        })
       }else{
        res.send(`El ${req.params.id} no existe`)
       }
        
       
        
    } catch (error) {
        console.log(`Error al eliminar carrito ${error}`)
    }
    
};
const listProductosCarrito = async (req,res)=>{
    try {
        const carrito = await carritoDao.listarProductosCarrito(req)
            if(carrito){
                res.status(200).json(carrito);
            }else{
                res.status(404).json({message:`El id: ${req.params.id} no exite`})
            }
    } catch (error) {
        
    }
};

const agregarProductoCarrito = async (req,res)=>{
    try {
           const contenedor = carritoDao.addProductCart(req)
           
            if(contenedor) {
                res.status(200).json({
                    ok: true,
                    message: `El producto fue dado de alta en el carrito ${req.params.id}`
                })
        }else{
            res.status(404).json({message:`El id: ${req.params.id} no exite`})
        };

        
    } catch (error) {
        console.log(`Error al agregar productos encontado ${error}`)
    }
};
const deleteProductoCarrito = async (req,res)=>{
    try {
   
          const contenedor = await carritoDao.eliminarUnProductoCarrito(req)
     
            if(contenedor != -1 ) {
                res.status(200).json({
                    ok: true,
                    message:  `El producto fue eliminado del carrito ${req.params.id}`
            })}else{
                res.status(404).json({message:`El id: ${req.params.id} del carrito no exite o id: ${req.params.id_prod} del producto no exite`})
            }
        
    } catch (error) {
        console.log(`Error al eliminar productos  ${error}`)
    }
};

module.exports = {agregaCarrito,eliminaCarrito,listProductosCarrito,agregarProductoCarrito,deleteProductoCarrito}