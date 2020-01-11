const mongoose = require('mongoose');
const { questionSchema } = require('./question');

const questionnaireSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['user', 'report'],
        required: true
    }, // Tipo de questionario
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    questions: {
        type: [questionSchema]
    }
});

const Questionnaire = mongoose.model('questionnaires', questionnaireSchema);

module.exports = Questionnaire;
