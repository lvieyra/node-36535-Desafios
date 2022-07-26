const { Router } = require('express');
const { faker } = require('@faker-js/faker');
// const fetch = require('node-fetch');
const router = Router();

router.get('/',(req, res) => {
    const output = [];
    for (let i = 0; i < 5; i++) {  
        
        output.push({
            'nombre':faker.commerce.product(),
            'precio': faker.commerce.price(1,5000),
            'foto': faker.image.food(240,240,true)
        });
    }

    res.render('tabla.hbs',{output});
})
// router.get('/view',(req, res) => {
//     fetch('http://localhost:8080/api/productos-test')
//     .then(response => response.json())
//     .then(items => {
//         res.render('tabla.hbs',{items})
//     })
// })

module.exports = router;