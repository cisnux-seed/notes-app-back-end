// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes')

const init = async() => {
    const notesService = new NotesService();
    const server = Hapi.server({
        port: process.env.PORT,
        // if NODE_ENV is 'production' then set ip 'localhost'
        // else set ip '0.0.0.0'
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();