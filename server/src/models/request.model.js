module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request", {
        blood_grp: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [2, 5]
            }
        },
        qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        hospital: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
    });

    return Request;
};