const express = require('express');
const Question = require('../models/question');
const router = express.Router();

//getQuestionById --> /id/:id
//insertOne --> /one
//insertMany --> /many
//getAll --> /all
//deleteByID --> /id/:id

//insertOne --> /one
router.post('/one', async (req, res) => {
    var questionJSON = req.body;
    const question = new Question(questionJSON);
    try {
        const result = await question.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//insertMany --> /many
router.post('/many', async (req, res) => {
    Question.insertMany(req.body, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(201).send(docs);
        }
    });
});

//getAll --> /all
router.get('/all', async (req, res) => {
    Question.find((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(docs);
        }
    });
});

//getQuestionById --> /id/:id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    Question.findById(id, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            if (!docs) {
                return res.status(404).send('Question not found');
            }
            res.status(200).send(docs);
        }
    });
});

//deleteByID --> /id/:id
router.delete('/id/:id', async (req, res) => {
    const id = req.params.id;

    Question.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send('Question not found');
        }
        res.status(200).send('The question has been deleted');
    });
});

// update --> /update
router.post('/edit', async (req, res) => {
    const question = await Question.findById(req.body._id);

    question.overwrite(req.body.question);

    await question.save((err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send({ message: 'Question not found' });
        }
        res.status(200).send(docs);
    });
});

module.exports = router;
