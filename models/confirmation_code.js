const mongoose = require('mongoose');

const confirmationcodeSchema = mongoose.Schema({
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

confirmationcodeSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

const ConfirmationCode = mongoose.model('ConfirmationCode', confirmationcodeSchema);

module.exports = ConfirmationCode;