const mongoose = require('mongoose');
const questionnaire = require('./questionnaire');

const answerSchema = new mongoose.Schema({
    questionnaire: questionnaire.schema, // Las preguntas
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    answers: [
        {
            _id: mongoose.Schema.Types.ObjectId,

            answer: {
                type: mongoose.Schema.Types.Mixed
            },
            questionType: {
                type: String,
                enum: [
                    'textbox',
                    'number',
                    'likert',
                    'datetime',
                    'yesno',
                    'radio',
                    'multiselect',
                    'geolocation'
                ],
                required: true
            }
        }
    ],
    userQuestionnaire: questionnaire.schema, // Las preguntas del usuario
    userAnswers: [
        {
            _id: mongoose.Schema.Types.ObjectId,

            answer: {
                type: mongoose.Schema.Types.Mixed
            },
            questionType: {
                type: String,
                enum: [
                    'textbox',
                    'number',
                    'likert',
                    'datetime',
                    'yesno',
                    'radio',
                    'multiselect',
                    'geolocation'
                ],
                required: true
            }
        }
    ]
});

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;
