module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        }
    });

    return User;
};