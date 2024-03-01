const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async(role='')=>{
    const roleExist = await Role.findOne({role});
     if(!roleExist){
       throw new Error(`El rol ${role} no existe en la DB`);
     };
   };

const emailExist = async(correo)=>{
       //Verificar si el correo existe
     const existeEmail = await Usuario.findOne({correo});

     if(existeEmail){
      throw new Error(` ${correo} como correo ya existe`);
     };
 
 };


 const existIdPorUsuario = async(id)=>{
  //Verificar si el correo existe
const existeUsuario = await Usuario.findById(id);

if(!existeUsuario){
 throw new Error(` El id ${id} no existe en la base de datos`);
};

};


module.exports = {
    esRolValido,
    emailExist,
    existIdPorUsuario
};