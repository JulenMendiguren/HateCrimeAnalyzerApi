console.log('Hola mundo');

const express = require('express');
const app = express();

app.get('/patata', (req, res) => {
    res.send(['Uno', 'dos', '3']);
});

app.listen(3333, () => console.log('escuchando en el puerto 3333'));
