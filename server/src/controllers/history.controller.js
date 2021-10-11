const db = require('../models');
const History = db.history;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Create a history
    const history = {
        req_id: req.body.req_id,
        blood_grp: req.body.blood_grp,
        qty: req.body.qty,
        req_name: req.body.req_name
    };

    // Save history in the database
    History.create(history)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the History."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    History.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "History was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update History with id=${id}. Maybe History was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating History with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    History.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "History was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete History with id=${id}. Maybe History was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete History with id=" + id
            });
        });
};

exports.findAll = (req, res) => {

    History.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Historys."
            });
        });
};

exports.graphData = (req, res) => {

    db.sequelize.query('select sum(qty) as qty,blood_grp from histories group by blood_grp', {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Histories."
            });
        });
}

exports.graphDataByDate = (req, res) => {

    db.sequelize.query('select sum(qty) as qty,blood_grp from histories where date(createdAt)= ? group by blood_grp', {
            replacements: [req.params.date],
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Histories."
            });
        });
}

exports.historyCount = (req, res) => {

    db.sequelize.query('select count(*) as historyCount from histories', {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving history count."
            });
        });
}