 const {response,request} = require('express'); 



 const usuariosGet=(req = request,res = response)=>{

    const {nombre = 'no name',pais,pueblo} = req.query;

   res.json({
        msj: 'get Api-controlador',
        nombre,
        pais,
        pueblo
    });
};

 const usuariosPost=(req,res = response)=>{
    const { nombre,edad } = req.body;

    res.json({
         msj: 'post Api-controlador',
         nombre,
         edad
     });
 };
 
 const usuariosDelete=(req,res = response)=>{
    res.json({
         msj: 'delete Api-controlador',
     });
 };
 
 const usuariosPatch=(req,res = response)=>{
    res.json({
         msj: 'patch Api-controlador',
     });
 };
 
 const usuariosPut=(req,res = response)=>{

    const {id} = req.params;

    res.json({
         msj: 'put Api-controlador',
         id,
     });
 };


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPatch,
    usuariosPut
};