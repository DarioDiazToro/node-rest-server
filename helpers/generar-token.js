const jwt = require('jsonwebtoken');

const generarJWT=(uid = '')=>{

    return new Promise((resolve,reject)=>{
     const payolad = {uid};
     jwt.sign(payolad,process.env.SECRETARYPRIVATEKEY,{
        expiresIn:'4h',
     },(err,token)=>{
        if(err){
          reject(err);
        }else{
            resolve(token);
        }
     });
    });
};

module.exports = {
    generarJWT
};