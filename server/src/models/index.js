const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '+05:30'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.donors = require('./donor.model')(sequelize, Sequelize);
db.guardians = require('./guardian.model')(sequelize, Sequelize);
db.history = require('./history.model')(sequelize, Sequelize);
db.inventory = require('./inventory.model')(sequelize, Sequelize);
db.patients = require('./patient.model')(sequelize, Sequelize);
db.requests = require('./request.model')(sequelize, Sequelize);
db.logins = require('./login.model')(sequelize, Sequelize);

db.guardians.belongsTo(db.patients, {
    foreignKey: {
        name: 'p_id',
        allowNull: false
    }
});

db.patients.hasOne(db.guardians, {
    foreignKey: {
        name: 'p_id',
        allowNull: false
    }
})

db.logins.belongsTo(db.users, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})

db.users.hasOne(db.logins, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})

// db.patients.belongsTo(db.requests, {
//     foreignKey: {
//         name: 'req_id',
//         allowNull: false
//     }
// })

// db.requests.hasOne(db.patients, {
//     foreignKey: {
//         name: 'req_id',
//         allowNull: false
//     }
// })

// db.history.belongsTo(db.requests, {
//     foreignKey: {
//         name: 'req_id',
//         allowNull: false
//     }
// })

// db.requests.hasOne(db.history, {
//     foreignKey: {
//         name: 'req_id',
//         allowNull: false
//     }
// })

module.exports = db;