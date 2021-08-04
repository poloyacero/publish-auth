const mongoose = require('mongoose');

const passcodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expires_at: {
        type: Date, default: Date.now, expires: 600
    },
    created_on: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'created_on' } });

passcodeSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

const Passcode = mongoose.model('Passcode', passcodeSchema);

module.exports = Passcode;