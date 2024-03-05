const mongoose = require('mongoose');



const connectionDB =async()=>{

    
    try {
    await mongoose.connect(process.env.MONGO_CNN, { useNewUrlParser: true, useUnifiedTopology: true },);
      console.log('Base de datos online');
     } catch (error) {
      console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
     };
};

module.exports = {
    connectionDB
};