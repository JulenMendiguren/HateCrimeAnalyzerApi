const express = require('express');
const Colective = require('../models/Colective');
const router = express.Router();
const Roles = require('../helpers/roles');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/roles');

//getAllColectives --> /all
router.get('/all', async (req, res) => {
    Colective.find({}, (err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There are no colectives in the DB');
            }
            res.status(200).send(docs);
        }
    });
});

//insertOne --> /one
router.post(
    '/one',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        const colective = new Colective(req.body);
        try {
            const result = await colective.save();
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
);

//insertMany --> /many
router.post(
    '/many',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        Colective.insertMany(req.body, (err, docs) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(201).send(docs);
            }
        });
    }
);

//deleteByID --> /id/:id
router.delete(
    '/id/:id',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        const id = req.params.id;

        Colective.findByIdAndDelete(id, (err, docs) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (!docs) {
                return res.status(404).send({ message: 'Colective not found' });
            }
            res.status(200).send({ message: 'The colective has been deleted' });
        });
    }
);

// update --> /update
router.post(
    '/update',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        const colective = await Colective.findById(req.body._id);

        colective.text_eu = req.body.text_eu;
        colective.text_es = req.body.text_es;
        colective.text_en = req.body.text_en;
        colective.text_fr = req.body.text_fr;

        await colective.save((err, docs) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (!docs) {
                return res.status(404).send({ message: 'Colective not found' });
            }
            res.status(200).send({ message: 'The colective has been updated' });
        });
    }
);

module.exports = router;
