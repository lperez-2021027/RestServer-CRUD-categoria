// Importaciones
// Dependencias
const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre_categoria: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String,
        default: 'N/A'
    }
});

module.exports = model('Categoria', CategoriaSchema);