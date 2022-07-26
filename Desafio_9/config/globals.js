const mongoose = require('mongoose')

const mongoConnection = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ecommerce",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
		console.log('*** CONEXION CORRECTA ***')
    } catch(e){
		console.log('*** ERROR CONEXION ***')
        throw new Error(`Error en DB ${e.message}`);
    }
}

module.exports = {
	mongoConnection
}