const { Router } = require("express");
const { check } = require("express-validator");
const { upload } = require("../middlewares/multer-file")
const Usuario = require("../models/usuario.js");

const {
  validarCampos,
  validarJWT,
  isAdminRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

// importo los controladores para cada endpoint
const {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut
} = require("../controllers/usuarios.js");

const Role = require("../models/role.js");

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    validarJWT,
    validarCampos,
    check("id").custom(existeUsuarioPorId),
    check('rol').custom(rol => esRoleValido(rol))
   
    
  ],
  upload.single('img'),
  usuariosPut
  
);

// router.put('/:id', upload.single('img'), async (req, res) => {
//   const { id } = req.params
//   const { nombre } = req.body
//   const { img } = req.file.filename // obtenemos el path del archivo subido por multer
//   try {
//     await Usuario.findByIdAndUpdate(id, { nombre, img:`/files/${req.file.filename}` })
//     res.json({
//       msg: "ok"
//     })
//   } catch (e) {
//     console.log(e.message)
//   }
// })


router.post( "/",
  [ 
    validarCampos,
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check("direccion", "La dirección no puede estar vacio").not().isEmpty(),
    check("edad", "La edad no puede estar vacio").not().isEmpty(),
    check("telefono", "El telefono no puede estar vacio").not().isEmpty(),
    check("password","El password tiene que tener al menos 6 caracteres").isLength({ min: 6 }),
    check("correo", "La dirección de correo no es valida").isEmail(),
    check("correo").custom(emailExiste),
    check('rol').custom(rol => esRoleValido(rol))
    
  ],
  [upload.single('img')],
  usuariosPost
);

// router.delete( "/:id",
//   [
//     validarJWT,
//     isAdminRole,
//     // a diferencias de los middlewares que venia creando este lo llamo
//     // en este momento, pero el truco esta en validar-roles, miralo !!
//     // asRole('ADMIN_ROLE', 'VENTAS_ROLE'),
//     check("id").custom(existeUsuarioPorId),
//     validarCampos,
//   ],
//   usuariosDelete
// );
router.delete('/:id', [
  validarJWT,
  isAdminRole,
  check('id','El id no es válido').isMongoId(),
  check('id').custom( id=>existeUsuarioPorId(id)),
  validarCampos
], 
usuariosDelete
);

module.exports = router;
