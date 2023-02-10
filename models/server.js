// Importaciones 
// Dependencias
const express = require('express');
const cors = require('cors');

// Clases
const {dbConection} = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categorias';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del Body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use(  express.static('public') );
    }

    routes(){
       this.app.use( this.categoriaPath, require('../routes/categoria') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        } )
    }
}

module.exports = Server;