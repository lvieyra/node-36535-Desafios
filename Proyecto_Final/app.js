const express = require('express');
const app = express();
const PORT = process.env.PORT ||8080;
global.Administrador = false;

app.use(express.json());

app.use('/api', require('./routes/users.js'))
app.listen(PORT, ()=>{
    console.log('El servidor se levanto en el puerto',PORT);
});
