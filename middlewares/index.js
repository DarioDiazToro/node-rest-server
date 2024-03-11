
const validarRoles = require('../middlewares/validar-roles');
const validaciones  = require('../middlewares/validaciones');
const validarJWT = require('../middlewares/validar-Jwt');


module.exports = {
    ...validarRoles,
    ...validarJWT,
    ...validaciones
};