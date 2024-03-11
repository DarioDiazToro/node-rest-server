const response = require('express');
const request = require('express');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-token');

const login=async(req,res=response)=>{
    const {correo,password} = req.body;

    
    try{

      const usuario =  await Usuario.findOne({correo});

    if(!usuario){
        return res.json({
            msg:'el correo no existe - correo'
        });
    };

    if(!usuario.estado){
        return res.status(400).json({
            msg:'el usuario no esta activo en la BD Estado:False'
        });
     };

     const validarPassword = bcryptjs.compareSync( password, usuario.password);
     
      if(!validarPassword){
        return res.status(400).json({
            msg:'la contraseña es incorrecta'
        });
      };
    
    const token = await generarJWT(usuario.id);
       res.json({
        usuario,
         token
     });

     }catch(error){
        console.log(error);
        return res.status(500).json({
          mgs:'comuniquese con el administrador',
        });
    };
};

module.exports = {
    login
};