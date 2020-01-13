console.log('Hola mundo');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();
const question = require('./routes/question');
const answer = require('./routes/answer');
const questionnaire = require('./routes/questionnaire');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/question/', question);
app.use('/api/answer/', answer);
app.use('/api/questionnaire/', questionnaire);

app.listen(5005, () => console.log('Escuchando Puerto: ' + 5005));

mongoose
    .connect('mongodb://localhost/hateCrimeDB', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'));
