 const {response } = require('express');
 const esAdminRole=(req,res = response,next)=>{
     if(!req.usuario){
        res.status(500).json({
            msg:'se quiere validar el role sin verificar el role primero'
        });
     };

     const {role,nombre} = req.usuario;
      
     if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador y no puede hacer esto`
        });
     };
     next();
 };


 const tieneRole = (...roles)=>{ 
    
    return (req,res,next)=>{
        if(!req.usuario){
            res.status(500).json({
                msg:'se quiere validar el role sin verificar el role primero'
            });
         };

        const roleUsuario = req.usuario.role;

        if(!roles.includes(roleUsuario)){
            res.status(401).json({
                msg:`El sevicio requiere uno de estos ${roles}`
            });
        };
        next();
    };
 };

 module.exports = {
    esAdminRole,
    tieneRole
 }