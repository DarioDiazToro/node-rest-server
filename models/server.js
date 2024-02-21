const express = require('express');
const cors = require('cors');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //Midlewares
        this.midlewares();
        //Rutas de aplicacion
        this.routes();
    };

    midlewares(){
        //Cors
        this.app.use( cors() );

        this.app.use(express.json());

        //Direrectorio publico
        this.app.use(express.static('public'));
     };

    routes(){
      this.app.use(this.usuariosPath, require('../routes/usuarios'));
    };


    listen(){ 
     this.app.listen(this.port,()=>{
        console.log('Escuchando el puerto ', this.port);
      });
    };
};

module.exports = Server;
