const { Router } = require("express");
const { check } = require("express-validator");
const { upload } = require("../middlewares/multer-file")

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

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId),
   // check("rol").custom(esRoleValido),
    validarCampos,
  ],
(req,res)=>{
  res.send(req.body)
}
  //usuariosPut
);

router.post( "/",
  [ 
    validarCampos,
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check("password","El password tiene que tener al menos 6 caracteres").isLength({ min: 6 }),
    check("correo", "La dirección de correo no es valida").isEmail(),
    check("correo").custom(emailExiste),
   // check('rol').custom(rol => esRoleValido(rol))
    
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
