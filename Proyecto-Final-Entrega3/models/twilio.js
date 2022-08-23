require('dotenv/config');
const logger = require("../helpers/winston-helper");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


const sendSMS = (user) => {
    client.messages
        .create({
            body: 'Hola, tu pedido ha sido recibido y se encuentra en proceso!',
            to: user.telefono,
            from: process.env.TWILIO_FROM_NUMBER,
        })
        .then(
            (message) => {
            logger.log(
                "error",
                `Hubo un error al enviar el SMS: ${message}`
            );
        });
        
};

const sendCartAlert = (user) => {
    client.messages
    .create({
        body: `Nuevo Pedido.  Cliente: ${user.nombre} (${user.telefono})`,
        to: `whatsapp:${process.env.TWILIO_TO_NUMBE}`,
        from: `whatsapp:${process.env.WHATSAPP_FROM_NUMBER}`,
    })
    .then(message => {
        logger.log(
            "success",
            `SMS enviado con éxito: ${message.sid} ${message.status}`
        );
    });
}


module.exports = {
    sendSMS,
    sendCartAlert,
}