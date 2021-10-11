module.exports = (sequelize, Sequelize) => {
    const Guardian = sequelize.define("guardian", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 30]
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isNumeric: true,
                len: [10, 10]
            }
        },
        p_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'patients',
                key: 'id'
            }
        }
    });

    return Guardian;
};