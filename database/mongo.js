const mongoose = require('mongoose');
const { MONGODB } = require('../config/config_key')

const connectDB = async() => {
    try {
        // deprecated options settings
        const ret = await mongoose.connect(MONGODB, { 
            keepAlive: true,
            keepAliveInitialDelay: 300000,
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            poolSize: 40,
            serverSelectionTimeoutMS: 5000,
            heartbeatFrequencyMS: 1000,
            socketTimeoutMS: 60000,
        });
        return ret;
    } catch (error) {
        console.log(error);
        await connectDB();
    }

    const db = mongoose.connection;

    // check db connection
    db.once('open', async () => {
        console.log('Connected to MongoDB');
    });

    // check db disconnection
    db.on('disconnected', async () => {
        console.log('MongoDB disconnected');
    });

    // check db is reconnected
    db.on('reconnected', () => {
        console.log('MongoDB reconnected');
    });

    // check db errors
    db.on('error', (error) => {
        console.log('Mongo error: ', error);
    });
}

module.exports = connectDB;