module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("history", {
        blood_grp: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [2, 5]
            }
        },
        req_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: true,
                isInt: true,
            }
        },
        req_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });

    return History;
};