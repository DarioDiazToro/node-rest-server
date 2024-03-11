
const { Router } = require('express');
const { check} = require('express-validator');
const router = Router();
const { validarDatos, } = require('../middlewares/validaciones');
const { login } = require('../controllers/auth.controllers');


router.post('/login',[
    check('correo','El email es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarDatos
],login);


module.exports = router;