module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        blood_grp: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notNull: true,
                len: [2, 5]
            }
        },
        qty: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isInt: true,
                min: 0
            }
        }
    });

    return Inventory;
};