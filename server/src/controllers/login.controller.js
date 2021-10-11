const db = require('../models');
const Login = db.logins;

exports.findAll = (req, res) => {

    Login.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Logins."
            });
        });
};

exports.findByName = (req, res) => {
    db.sequelize.query("select u.username,l.createdAt from users u, logins l where u.id=l.user_id order by date(l.createdAt) desc,time(l.createdAt) desc")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Logins."
            });
        });
}