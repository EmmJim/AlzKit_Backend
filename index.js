const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Conectar a la BD
conectarDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));

//Routing
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pacientes', require('./routes/pacientes'));

//Sockets
io.on('connection', socket => {
    console.log('cliente conectado');

    socket.on('enviar-localizacion', (payload) => {
        console.log(payload);
        io.emit('enviar-localizacion', payload);
    })

    socket.on('push-token', payload => {
        console.log(payload);
    })

    socket.on('conectado', usuario => {
        console.log(usuario)
    })
})



//Asignacion Puerto
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('Servidor funcionando');
})