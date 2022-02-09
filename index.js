const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

//Conectar a la BD
conectarDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));

//Routing
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

//Asignacion Puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Servidor funcionando');
})