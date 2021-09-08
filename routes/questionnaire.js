const express = require('express');
const Questionnaire = require('../models/questionnaire');
const router = express.Router();
const Roles = require('../helpers/roles');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/roles');

//getQuestionnaireById --> /id/:id
//insertOne --> /one
//insertMany --> /many
//getAll --> /all
//getLastUser --> /last/user
//getLastReport --> /last/report
//deleteByID --> /id/:id
//getVersionsReport --> /versions/report'

//insertOne --> /one
router.post(
    '/one',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        var questionnaireJSON = req.body;
        const questionnaire = new Questionnaire(questionnaireJSON);
        try {
            const result = await questionnaire.save();
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
        Questionnaire.insertMany(req.body, (err, docs) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(201).send(docs);
            }
        });
    }
);

//getAll --> /all
router.get('/all', async (req, res) => {
    Questionnaire.find((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(docs);
        }
    });
});

//getAllUsers --> /all/user
router.get('/all/user', async (req, res) => {
    Questionnaire.find({ category: 'user' }, (err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no user questionnaire in the DB');
            }
            res.status(200).send(docs);
        }
    });
});

//getAllReports --> /all/report
router.get('/all/report', async (req, res) => {
    Questionnaire.find({ category: 'report' }, (err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no report questionnaire in the DB');
            }
            res.status(200).send(docs);
        }
    });
});

//getQuestionnaireById --> /id/:id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    Questionnaire.findById(id, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            if (!docs) {
                return res.status(404).send('Questionnaire not found');
            }
            res.status(200).send(docs);
        }
    });
});

//deleteByID --> /id/:id
router.delete(
    '/id/:id',
    [auth, authorizeRole([Roles.Researcher, Roles.Admin])],
    async (req, res) => {
        const id = req.params.id;

        Questionnaire.findByIdAndDelete(id, (err, docs) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (!docs) {
                return res.status(404).send('Questionnaire not found');
            }
            res.status(200).send('The questionnaire has been deleted');
        });
    }
);

//getLastUser
router.get('/last/user', async (req, res) => {
    Questionnaire.find({ category: 'user' })
        .sort({ createdAt: -1 })
        .limit(1)
        .then((docs, failed) => {
            if (failed) {
                return res.status(500).send(failed);
            }
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no user questionnaire in the DB');
            }
            res.status(200).send(docs[0]);
        });
});

//getLastReport
router.get('/last/report', async (req, res) => {
    Questionnaire.find({ category: 'report' })
        .sort({ createdAt: -1 })
        .limit(1)
        .then((docs, failed) => {
            if (failed) {
                return res.status(500).send(failed);
            }
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no report questionnaire in the DB');
            }
            res.status(200).send(docs[0]);
        });
});

//getVersionsReport
router.get('/versions/report', async (req, res) => {
    Questionnaire.find({ category: 'report' }, { createdAt: 1, versionName: 1 })
        .sort({
            createdAt: -1,
        })
        .then((docs, failed) => {
            if (failed) {
                return res.status(500).send(failed);
            }
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no report questionnaire in the DB');
            }
            res.status(200).send(docs);
        });
});

module.exports = router;
