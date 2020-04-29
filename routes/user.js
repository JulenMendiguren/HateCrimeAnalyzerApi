const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

// Registrar nuevo usuario
router.post('/one', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('That user already exists');

    // Hasheando la password
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        //password: hashedPw,
    });

    const result = await user.save().catch((e) => res.status(400).send(e));
    res.status(201).send('New user registered');
});

//getAll --> /all
router.get('/all', async (req, res) => {
    User.find((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(docs);
        }
    });
});

// Iniciar sesión --> /auth
router.post('/auth', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Compara la password con el hash de la DB
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).send('Invalid email or password');

    const jwt = user.generateJWT();
    res.status(200).send({ jwt });
});

module.exports = router;
