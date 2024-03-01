 const {response,request} = require('express'); 
 const Usuario = require('../models/usuario');
 const bcryptjs = require('bcryptjs');


 
 const usuariosGet=async(req = request,res = response)=>{    
    const {page=1, limite = 5, desde = 0} =  req.query;

    const query = {estado:true};


 const [usuarios,total] = await Promise.all([

   Usuario.find(query)
     .limit(Number(limite))
     .skip(Number(desde)),

   Usuario.countDocuments(query),

  ]);

   res.json({
    total,
    usuarios  
    });
};

 const usuariosPost=async(req,res = response)=>{

    const {nombre,password,role,correo} = req.body;

    const usuario = new Usuario({nombre,password,role,correo});


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(salt);

    //Guardar en DB
    await usuario.save();

    res.json({
         msj: 'post Api-controlador',
         usuario
     });
 };
 
 const usuariosDelete=async(req,res = response)=>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json(usuario);
 };
 
 const usuariosPatch=(req,res = response)=>{
    res.json({
         msj: 'patch Api-controlador',
     });
 };
 
 const usuariosPut=async(req,res = response)=>{

    const {id} = req.params;
    const { _id, password,google, correo ,...resto} = req.body;

     if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(salt);
     };
    const usuario = await Usuario.findByIdAndUpdate(id, resto );

    res.json(usuario);
 };


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
};