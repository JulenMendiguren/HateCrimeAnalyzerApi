const express = require('express');
const Answer = require('../models/Answer');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

//getAnswerById --> /id/:id
//insertOne --> /one
//insertMany --> /many
//getAll --> /all
//deleteByID --> /id/:id

//insertOne --> /one
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

//insertMany --> /many
router.post('/many', async (req, res) => {
    Answer.insertMany(req.body, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(201).send(docs);
        }
    });
});

//getAll --> /all
router.get('/all', async (req, res) => {
    Answer.find((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(docs);
        }
    });
});

//getAnswerById --> /id/:id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    Answer.findById(id, (err, docs) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            if (!docs) {
                return res.status(404).send('Answer not found');
            }
            res.status(200).send(docs);
        }
    });
});

//deleteByID --> /id/:id
router.delete('/id/:id', async (req, res) => {
    const id = req.params.id;

    Answer.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!docs) {
            return res.status(404).send('Answer not found');
        }
        res.status(200).send('The answer has been deleted');
    });
});

//getLastReport
router.get('/last/report', async (req, res) => {
    Answer.find({ category: 'report' })
        .sort({ createdAt: -1 })
        .limit(1)
        .then((docs, failed) => {
            if (failed) {
                return res.status(500).send(failed);
            }
            if (Array.from(docs).length == 0) {
                return res
                    .status(404)
                    .send('There is no report answer in the DB');
            }
            res.status(200).send(docs);
        });
});

router.post('/filter', async (req, res) => {
    const filterJSON = req.body;
    let mongoFilter = {};

    if (filterJSON.version != 'all' && filterJSON.version) {
        mongoFilter['questionnaire._id'] = new ObjectId(filterJSON.version);
    }

    if (filterJSON.startDate || filterJSON.endDate) {
        mongoFilter['createdAt'] = {};
        if (filterJSON.startDate) {
            mongoFilter.createdAt['$gt'] = new Date(filterJSON.startDate);
        }
        if (filterJSON.endDate) {
            mongoFilter['createdAt']['$lt'] = new Date(filterJSON.endDate);
        }
    }

    Answer.find(mongoFilter).then((docs, failed) => {
        if (failed) {
            return res.status(500).send(failed);
        }
        if (docs) {
            // If filtering by place is enabled
            if (filterJSON.place.enabled && filterJSON.place.radius) {
                filterByLocation(
                    filterJSON.place.location,
                    filterJSON.place.radius,
                    docs,
                    res
                );
            } else {
                return res.status(200).send(docs);
            }
        }
    });
});

function filterByLocation(origin, radius, docs, res) {
    const validDocs = [];

    docs.forEach((ans) => {
        // Hardcoded, better solution?
        if (ans.answers[1]._id == '5e9dc343b6022105820960de') {
            const latLngString = ans.answers[1].answer.split(',');
            const lat = parseFloat(latLngString[0]);
            const lng = parseFloat(latLngString[1]);
            if (distTwoCoords(origin.lat, origin.lng, lat, lng) <= radius) {
                console.log(distTwoCoords(origin.lat, origin.lng, lat, lng));
                validDocs.push(ans);
            }
        }
    });

    return res.status(200).send(validDocs);
}
// Harvesine formula to calculate distance between 2 coordinates on the Earth
function distTwoCoords(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
}

module.exports = router;
