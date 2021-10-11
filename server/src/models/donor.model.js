module.exports = (sequelize, Sequelize) => {
    const Donor = sequelize.define("donor", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                notNull: true,
                len: [3, 15]
            }
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                notNull: true,
                len: [3, 15]
            }
        },
        adhaar: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                notNull: true,
                len: [12, 12]
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                notNull: true,
                len: [10, 12]
            }
        },
        blood: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [2, 5]
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isAlpha: true,
            }
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                notNull: true
            }
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notNull: true,
                min: 18,
                max: 60
            }
        },
        sex: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [1, 1]
            }
        },
        lastdonation: {
            type: Sequelize.DATE
        },
        complication: {
            type: Sequelize.STRING
        }
    });

    return Donor;
};