const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['user', 'report'],
        required: true
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
            'geolocation'
        ],
        required: true
    },
    possibleAnswers: {
        type: [String]
    },
    options: {
        required: {
            type: Boolean,
            required: true
        },
        subquestionOf: String,
        requiredAnswer: String,
        size: {
            type: String, // Sólo textbox
            enum: ['big', 'small'],
            default: 'small'
        },
        minLength: Number, // Sólo textbox, número de caracteres
        maxLength: Number, // Sólo textbox, número de caracteres
        minValue: Number, // Sólo number, valor mínimo
        maxValue: Number, // Sólo number, valor máximo
        slider: Boolean, // Sólo number, true or false (absencia == false), necesita maxValue y minValue
        datetimeFormat: {
            type: String, // Sólo textbox
            enum: ['datetime', 'date', 'time'],
            default: 'datetime'
        } // Sólo datetime, muestra fecha y hora, sólo fecha, o sólo hora.
    },
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
