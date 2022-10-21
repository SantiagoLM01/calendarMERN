
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config()


//Crear el servidor de express

const app = express()

//Base de Date
dbConnection()

//CORS

app.use(cors())

//Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Si no se usa HashRouter en react es recomendado esto solo que da un error con el MIME por el type module en el index.html
/* app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

}) */

//TODO: CRUD: Eventos

//Directorio publico

app.use(express.static('public'));


//Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})  