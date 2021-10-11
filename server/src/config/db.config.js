module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "jamwal@2610",
    DB: "testdb",
    dialect: "mysql",
    dialectOptions: {
        useUTC: false,
    },
    timezone: '+05:30',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};