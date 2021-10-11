const db = require('../models');
const Guardian = db.guardians;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Create a guardian
    const guardian = {
        name: req.body.name,
        phone: req.body.phone,
        p_id: req.body.p_id
    };

    // Save guardian in the database
    Guardian.create(guardian)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the guardian."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Guardian.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Guardian was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Guardian with id=${id}. Maybe Guardian was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Guardian with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Guardian.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Guardian was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Guardian with id=${id}. Maybe Guardian was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Guardian with id=" + id
            });
        });
};

exports.findAll = (req, res) => {

    Guardian.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Guardians."
            });
        });
};

exports.findByPid = (req, res) => {
    const id = req.params.id;
    Guardian.findOne({
            where: {
                p_id: id
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving guardian."
            });
        });
};