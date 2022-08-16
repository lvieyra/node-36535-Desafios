const mongoose = require('mongoose');
const dbConnections = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/productDB',);
        console.log('*** Conexión de la base de datos ***')
    } catch (error) {
        console.log(error);
        throw Error('Error connecting to Mongo')
    }
    
}

module.exports = {dbConnections};