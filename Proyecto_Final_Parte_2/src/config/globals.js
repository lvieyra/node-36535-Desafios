require('dotenv').config()
const mongoose = require('mongoose')

const mongoConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
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
	mongoConnection,
	FIRESTORE_FILE: process.env.FIRESTORE_FILE || ''
}

