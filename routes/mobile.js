const mongosee = require('mongoose');
const express = require('express');
// To remove
const Question = require('../models/question');

const router = express.Router();

// To remove
router.post('/new', async (req, res) => {
    console.log('post a api/mobile');
    var body = req.body;
    console.log('body:', body);

    const question = new Question(body);

    const result = await question.save();
    console.log('result: ', result);
    res.status(201).send(result);
});

router.get('/', async (req, res) => {
    const questions = await Question.find();
    //.populate('company', 'name country')
    res.send(questions);
});

module.exports = router;
