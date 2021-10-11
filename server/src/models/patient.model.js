module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: false,
            }
        },
        req_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: false,
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
        sex: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
                len: [1, 1]
            }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isInt: true
            }
        },
        doctor: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: false,
            }
        },
        hospital: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: false,
            }
        }
    });

    return Patient;
};