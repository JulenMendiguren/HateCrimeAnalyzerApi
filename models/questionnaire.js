const mongoose = require('mongoose');
const Question = require('./question');

const questionnaireSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['user', 'report'],
        required: true,
    }, // Tipo de questionario
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    questions: [Question.schema],
    versionName: {
        type: String,
        required: false,
    },
});

const Questionnaire = mongoose.model('questionnaires', questionnaireSchema);

module.exports = Questionnaire;
