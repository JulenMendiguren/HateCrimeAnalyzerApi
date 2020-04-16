const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text_eu: {
        type: String,
        required: true,
    },
    text_es: {
        type: String,
        required: true,
    },
    text_en: {
        type: String,
        required: true,
    },
    text_fr: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['user', 'report'],
        required: true,
    },
    tag: {
        type: String,
        enum: ['all', '01', '02', '03', '04', '05', '06', '07', '08'],
        required: true,
    },
    type: {
        type: String,
        enum: [
            'textbox',
            'number',
            'likert',
            'datetime',
            'yesno',
            'radio',
            'multiselect',
            'geolocation',
        ],
        required: true,
    },
    possibleAnswers_eu: {
        type: [String],
    },
    possibleAnswers_es: {
        type: [String],
    },
    possibleAnswers_en: {
        type: [String],
    },
    possibleAnswers_fr: {
        type: [String],
    },
    options: {
        required: {
            type: Boolean,
            required: true,
        },
        subquestionOf: mongoose.Schema.Types.ObjectId,
        requiredAnswerIndex: Number, // Índice de la respuesta requerida en possibleAnswers_xx
        size: {
            type: String, // Sólo textbox
            enum: ['big', 'small'],
        },
        minLength: Number, // Sólo textbox, número de caracteres
        maxLength: Number, // Sólo textbox, número de caracteres
        minValue: Number, // Sólo number, valor mínimo
        maxValue: Number, // Sólo number, valor máximo
        slider: Boolean, // Sólo number, true or false (ausencia == false), necesita maxValue y minValue
        datetimeFormat: {
            type: String, // Sólo textbox
            enum: ['datetime', 'date', 'time'],
        }, // Sólo datetime, muestra fecha y hora, sólo fecha, o sólo hora.
    },
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
