const mongosee = require('mongoose');
const express = require('express');
const Colective = require('../models/Colective');
const router = express.Router();

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
router.post('/one', async (req, res) => {
    const colective = new Colective(req.body);
    try {
        const result = await colective.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//insertMany --> /many
router.post('/many', async (req, res) => {
    Colective.insertMany(req.body, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(201).send(docs);
        }
    });
});

//deleteByID --> /id/:id
router.delete('/id/:id', async (req, res) => {
    const id = req.params.id;

    Colective.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send('Colective not found');
        }
        res.status(200).send('The colective has been deleted');
    });
});

module.exports = router;
