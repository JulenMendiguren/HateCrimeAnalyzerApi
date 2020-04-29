const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['colaborator', 'researcher', 'admin'],
    },
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

// Genera una JWT con los datos del usuario
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        'CRpr4mgr5BqpXV'
    );
};

const User = mongoose.model('user', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;
