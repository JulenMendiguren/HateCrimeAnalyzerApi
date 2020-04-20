const mongoose = require('mongoose');

const colectiveSchema = new mongoose.Schema({
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
});

const Colective = mongoose.model('colectives', colectiveSchema);

module.exports = Colective;
