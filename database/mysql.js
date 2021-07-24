const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = require('../config/config_key');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    pool: {
        max: 30,
        min: 5,
        acquire: 60000,
        idle: 60000
    },
    dialectOptions: {
        connectTimeout: 60000
    },
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.users = require('../models/user')(sequelize, Sequelize);
db.auth = require('../models/authuser')(sequelize, Sequelize);
db.oauth_clients = require('../models/oauthclients')(sequelize, Sequelize);
db.oauth_grants = require('../models/oauthgrants')(sequelize, Sequelize);

db.oauth_clients.hasMany(db.oauth_grants, {
  foreignKey: 'client_id',
  as: 'grants',
  foreignKeyConstraint: true
});

const testConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
    }catch(err) {
        console.log('Database connection failed');
    }
}
testConn();

module.exports = db;