// Importaciones
// Dependencias
const { response, request } = require('express');

// Clases
const Categoria = require('../models/categoria');

const getCategorias = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'get Api - Get Categoria',
        listaCategorias
    });
}

const postCategoria = async (req = request, res = response) => {
    const { nombre_categoria, descripcion } = req.body;
    const categoriaGuardadaDB = new Categoria({ nombre_categoria, descripcion });

    await categoriaGuardadaDB.save();

    res.json({
        msg: 'Post Api - Post Categoria',
        categoriaGuardadaDB
    });

    /* Utilizar como para test
    {
        "nombre_categoria": "Comida",
        "descripcion": "Alimento variado"
    }
    */
}

const putCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const categoriaEditada = await Categoria.findOneAndUpdate(id, resto);

    res.json({
        msg: 'Put Api - Put Categoria',
        categoriaEditada
    })
}

const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    // Eliminando de manera total en la DB
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    /*
    Eliminando de manera lógica de la DB
    const categoriaEliminada = await Categoria.findByIdAndUpdate({estado: false});
    */

    res.json({
        msg: 'Delete Api - Delete Categoria',
        categoriaEliminada
    })
}

module.exports = {
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}