const { Router } = require('express');
const { check} = require('express-validator');
const router = Router();
const { validarDatos, } = require('../middlewares/validaciones');
const { esRolValido, emailExist, existIdPorUsuario,} = require('../helpers/db-validations');
const { usuariosGet, 
       usuariosDelete, 
       usuariosPost,
       usuariosPatch, 
       usuariosPut
     } = require('../controllers/ususarios.controlles');
const { validationField } = require('../helpers/validation-fields-query');


 router.get('', [
    check('limite').custom (async(limite)=>{
       await validationField(limite);
    }),
    check('desde').custom(async(desde)=>{
       await validationField(desde);
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

  