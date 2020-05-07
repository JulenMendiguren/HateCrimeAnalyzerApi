const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/roles');

// Registrar nuevo usuario
router.post('/one', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send({ message: 'That user already exists' });

    // Hasheando la password
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashedPw,
    });

    const result = await user.save().catch((e) => res.status(400).send(e));
    res.status(201).send({ message: 'New user registered' });
});

//getAll --> /all
router.get('/all', [auth, authorizeRole(['admin'])], async (req, res) => {
    User.find({}, '_id name email role', (err, docs) => {
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
    if (!user)
        return res.status(400).send({ message: 'Invalid email or password' });

    // Compara la password con el hash de la DB
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match)
        return res.status(400).send({ message: 'Invalid email or password' });

    const jwt = user.generateJWT();
    res.status(200).send({ jwt });
});

//deleteByID --> /id/:id
router.delete('/id/:id', async (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'The user has been deleted' });
    });
});

// update --> /update
router.post('/update', async (req, res) => {
    const user = await User.findById(req.body._id);

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    const result = await user.save((err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'The user has been updated' });
    });
});

module.exports = router;
