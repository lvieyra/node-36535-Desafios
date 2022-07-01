// const getAllProductos = (req,res)=> {

//     res.send({list:[1,2,3,4,5,6,7,8,9]})
// };
const express = require('express');
const fs = require('fs/promises');
const contenedor = require('../models/contenedor.js');
const productos = require('../models/productos.js');
const recipiente = new contenedor('productos.txt',fs);

const getProducto = (req,res)=> {
    const id = req.params.id;
    console.log(id);
    if (!id) {
        recipiente.getAll().then(val => res.status(200).json(val));
    }else{
        recipiente.getById(id).then(val => {
            if(val != null){
                res.status(200).json(val);
            }else{
                res.status(404).json({message: 'Producto no encontrado'})    
            }
        })  
    }
    
}

const createProducto = (req,res)=>{
    try{
        const producto = req.body;
    console.log(producto);
     recipiente.save(producto);
     res.status(201).json(producto);

    } catch (error) {
        res.status(409).json({
            mensaje: 'El producto ya exite ' + error.message
        });
    
    }
};
const updateProducto = (req,res)=>{
    try {
        recipiente.actualizarProducto(req);
        res.status(200).json(req.body)
    } catch (error) {
        {
            error: 'Error del servidor'
        }
    }
   
};
const deleteProducto = (req,res)=>{
    try{
      recipiente.deleteById(req.params.id);
      res.status(200).json({
                            ok:true,
                            message:`${req.params.id} ha sido eliminado`})
    }catch(error){
         {
            error: 'Error del servidor'
         }
    };
};

module.exports = { getProducto,createProducto,updateProducto,deleteProducto};