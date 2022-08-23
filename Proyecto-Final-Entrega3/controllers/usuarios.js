const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario.js");

const usuariosGet = async (req = request, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({ estado: true }),
      Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
    ]);
  
    const pagina = usuarios.length;
  
    res.json({
      msg: "ok",
      total,
      pagina,
      usuarios,
    });
  }
    catch (error) {
    logger.log("error", `Hubo un error en el login: ${error}`);
  }
}

 const usuariosPut = async (req = request, res = response) => {
 
  try {
    const { id } = req.params
    const { password,correo, ...resto } = req.body
    const { img } = req.file.filename // obtenemos el path del archivo subido por multer
    resto.img=`/files/${req.file.filename}`;
    
    if (password) {
          // encriptar password
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario =  await Usuario.findByIdAndUpdate(id,resto)
    res.json({
      msg: "ok",
      usuario
    })

  } catch (e) {
    logger.log("error", `Hubo un error en el login: ${e}`);
    console.log(e.message)
  }
 }

// const usuariosPut = async (req = request, res = response) => {
//   const { id } = req.params;
 
//   const { _id, password, google, correo, ...resto } = req.body;

//   if (password) {
//     // encriptar password
//     const salt = bcryptjs.genSaltSync();
//     resto.password = bcryptjs.hashSync(password, salt);
//   }

//   const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

//   res.json({
//     msg: "ok",
//     usuario,
//   });
// };

const usuariosPost = async (req = request, res = response) => {
  try {
    const { nombre,direccion,edad,telefono, correo, password, rol } = req.body;
  
  const usuario = new Usuario({ nombre,direccion,edad,telefono, correo, password, img: `/files/${req.file.filename}`, rol });
  

  // encriptar password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);
   
  // grabo en la BD
  await usuario.save();
  res.json({
    msg: "ok",
    usuario,
  });
  } catch (error) {
    logger.log("error", `Hubo un error en el login: ${error}`);
    console.log(error.message)
  }
  
};

const usuariosDelete = async (req = request, res = response) => {

  try {
    const { id } = req.params;
  // Ojo el Delete no funciona como antes
  // esto no deberia usarse
  // const usuario = Usuario.findByIdAndDelete(id);
  // Esto es lo mejor marcar con un estado en false para hacer un borrado logico no fisico
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(usuario);
  } catch (error) {
    logger.log("error", `Hubo un error en el login: ${error}`);
    console.log(error.message)
  }
  
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
