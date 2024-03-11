const  jwt = require('jsonwebtoken');
const {request,response} = require('express');
const Usuario = require('../models/usuario');

 const validarJwt=async(req = request, res = response,next)=>{
    const token = req.header('x-token');

     if(!token){
        return res.status(401).json({
            mgs:'No hay token en la peticion'
        });
     };
     try { 
        const { uid } =  jwt.verify(token, process.env.SECRETARYPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido usuario no existe en DB'
            });
        };
        //Verificar si uid tiene el estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido usuario-estado: false'
            });
        };
        next();
    }catch (error) {
        console.log('error ======> ', error);
        res.status(401).json({
            msg:'Token no valido',
        });
     };
};


module.exports = {
     validarJwt
};