console.log('Hola mundo');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');

const question = require('./routes/question');
const answer = require('./routes/answer');
const questionnaire = require('./routes/questionnaire');
const colective = require('./routes/colective');
const user = require('./routes/user');

app.use(express.json());
app.use(morgan('tiny'));

// https://victorroblesweb.es/2018/01/31/configurar-acceso-cors-en-nodejs/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/question/', question);
app.use('/api/answer/', answer);
app.use('/api/questionnaire/', questionnaire);
app.use('/api/colective/', colective);
app.use('/api/user/', user);

app.listen(5005, () => console.log('Escuchando Puerto: ' + 5005));

mongoose
    .connect('mongodb://localhost/hateCrimeDB', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado a MongoDb'))
    .catch((erro) => console.log('No se ha conectado a MongoDb'));
