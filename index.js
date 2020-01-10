console.log('Hola mundo');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
morgan('tiny');
const app = express();
const mobile = require('./routes/mobile');

app.use(express.json());
app.use('/api/mobile/', mobile);

app.listen(5005, () => console.log('Escuchando Puerto: ' + 5005));

mongoose
    .connect('mongodb://localhost/hatecrimeDB', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'));
