
const validationField =async (query=5)=>{
   if(isNaN(query)){
      throw new Error(` ${query} no es un numero`);
   };
};

module.exports = {
    validationField
};