const {Schema, model} = require("mongoose");

const CategoriaSchema = new Schema({
    nombre: { type: String, required: true },
    estado:{ type: Boolean, required: true, default: true },
    usuario:{ type: Schema.Types.ObjectId, ref: 'Usuario', required:true }
  });
  
  module.exports = model('Categoria', CategoriaSchema);