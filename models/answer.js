const mongoose = require('mongoose');
const { questionnaireSchema } = require('./questionnaire');

const answerSchema = new mongoose.Schema({
    questionnaire: questionnaireSchema, // Las preguntas
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    answers: {
        _id: ObjectId,
        answer: {
            type: asd => console.log(asd) //Check esto
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
});

const Answer = mongoose.model('answers', questionnaireSchema);

module.exports = Answer;
