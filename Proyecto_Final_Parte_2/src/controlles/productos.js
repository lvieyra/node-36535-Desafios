

const  ProductoDaoMongo  = require('../dao/productos/productosDaoMongo.js')
const productoDao = new ProductoDaoMongo()

const getProducto =  async (req,res)=> {
    const {id} = req.params;
    let response;

    try {
        if(!id) {
            response = await productoDao.getAllProductos();
            
        }else{
            
            response = await productoDao.getByIdProducto(id);
        }

        
            res.send({ Ok: true, response})
        
         
    } catch (error) {
       
       res.send(error.message)
    }
    
    
    
}

const createProducto = async(req,res)=>{
    try{
        const producto = req.body;
        

     await productoDao.saveProducto(producto);
     res.status(201).json({Ok:true,producto});

    } catch (error) {
        res.status(409).json({
            mensaje: 'El producto ya exite ' + error.message
        });
    
    }
};
const updateProducto = async (req,res)=>{
    try {
        
      await  productoDao.actualizacionProducto(req.params.id,req.body);
        res.status(200).json(req.body)
    } catch (error) {
        res.send(error.message)
    }
   
};
const deleteProducto = async (req,res)=>{
    try{
        
     await productoDao.deleteById(req.params.id);
      res.status(200).json({
                            ok:true,
                            message:`${req.params.id} ha sido eliminado`})
    }catch(error){
        res.send(error.message)
    };
};

module.exports = { getProducto,createProducto,updateProducto,deleteProducto};