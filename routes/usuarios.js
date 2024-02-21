const { Router } = require('express');
const router = Router();
const { usuariosGet, 
       usuariosDelete, 
       usuariosPost,
       usuariosPatch, 
       usuariosPut } = require('../controllers/ususarios.controlles');

 router.get('/',usuariosGet);

 router.post('/',usuariosPost);

 router.delete('/',usuariosDelete);

 router.patch('/',usuariosPatch);

 router.put('/:id',usuariosPut);

module.exports = router;

  