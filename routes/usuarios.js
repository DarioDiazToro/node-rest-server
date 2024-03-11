const { Router } = require('express');
const { check} = require('express-validator');
const router = Router();
const { esRolValido, emailExist, existIdPorUsuario,} = require('../helpers/db-validations');
const { validationFields } = require('../helpers/validation-fields-query');

const {
   tieneRole,
   validarJwt,
   validarDatos
} = require('../middlewares');

const { usuariosGet, 
       usuariosDelete, 
       usuariosPost,
       usuariosPatch, 
       usuariosPut
     } = require('../controllers/ususarios.controlles');

 router.get('', [
    check('limite').custom (async(limite)=>{
       await validationFields(limite);
    }),
    check('desde').custom(async(desde)=>{
       await validationFields(desde);
    }),
     validarDatos,
 ], usuariosGet);

 router.post('/',[
      check('correo','el correo electronico no es valido').isEmail(),
      check('correo').custom(emailExist),
      check('nombre','Debe llenar este campo ').not().isEmpty(),
      check('password','La contraseña debe tener mas de 6 caracteres').isLength({min:6}),
      check('role').custom(esRolValido),
      validarDatos
 ],usuariosPost);


 router.delete('/:id',[
    validarJwt,
   //  esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','NOSE_ROL'),
    check('id','no es un id valido para mongo DB').isMongoId(),
    check('id').custom(existIdPorUsuario),
    validarDatos
 ],
 usuariosDelete);

 router.patch('/',usuariosPatch);

 router.put('/:id',[
     check('id','no es un id valido para mongo DB').isMongoId(),
     check('id').custom(existIdPorUsuario),
     check('role').custom(esRolValido),
     validarDatos
 ],usuariosPut);

module.exports = router;

  