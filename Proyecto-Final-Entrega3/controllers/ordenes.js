const OrdenServicio = require('../services/ordenes.js')
const ordenServicio = new OrdenServicio();

const createOrder = async(req, res) => {
    try {
        const idCart = req.params.idCart;
        const response = await ordenServicio.createOrder(idCart);
        res.status(200).json(response.data)

    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message)
    }
    
}

const getOrdersByEmail = async(req, res) => {
    try {
        const email = req.params.email;
        const response = await ordenServicio.getOrdersByEmail(email);
        res.status(200).json(response.data)
    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message) 
    }
    
}
module.exports = {
    createOrder,
    getOrdersByEmail,
}