module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            validate: {
                notNull: true,
            },
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });

    return Login;
};