/**
 * ProductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Productos = require("../models/Productos");

module.exports = {

  async create(req, res){
    try {

      let params = req.allParams();
      if(!params.nombre){
        return res.badRequest({err: 'Es obligatorio ingresar  nombre'});
      }
      const results = await Productos.create({
        nombre: params.nombre,
        descripcion: params.descripcion,
        precio: params.precio
      });
      return res.status(200).json({
        msg: 'Post API controller',
        results
      });
    }
    catch (err){
      return res.serverError(err);
    }
  },

  async find(req, res){

    try {
      const productos = await Productos.find();
      return res.ok(productos);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findOne(req, res){
    try {
      const productos = await Productos.findOne({
        id: req.params.id
      });
      return res.ok(productos);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async update(req, res){
    try {
      let params = req.allParams();
      let attributes = {};
      if(params.nombre){
        attributes.nombre = params.nombre;
      }
      if(params.descripcion){
        attributes.descripcion = params.descripcion;
      }
      if(params.precio){
        attributes.precio = params.precio;
      }

      const results = await Productos.update({id: req.params.id}, attributes, {updatedAt: Date.now()});
      return res.ok(results);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async delete(req, res){
    try {
      const results = await Productos.destroy({
        id: req.params.id
      });
      return res.ok(results);
    } catch (err) {
      return res.serverError(err);
    }
  }
};

