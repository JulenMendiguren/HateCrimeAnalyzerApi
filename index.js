console.log('Hola mundo');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();
const question = require('./routes/question');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/question/', question);

app.listen(5005, () => console.log('Escuchando Puerto: ' + 5005));

mongoose
    .connect('mongodb://localhost/hateCrimeDB', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'));
