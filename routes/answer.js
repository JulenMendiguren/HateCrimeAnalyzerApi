const mongosee = require('mongoose');
const express = require('express');
const Answer = require('../models/Answer');
const router = express.Router();

router.post('/one', async (req, res) => {
    var answerJSON = req.body;
    const answer = new Answer(answerJSON);
    try {
        const result = await answer.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
