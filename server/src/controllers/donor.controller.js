const db = require('../models');
const Donor = db.donors;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Create a Donor
    const donor = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adhaar: req.body.adhaar,
        phone: req.body.phone,
        blood: req.body.blood,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        dob: req.body.dob,
        age: req.body.age,
        sex: req.body.sex,
        lastdonation: req.body.lastdonation,
        complication: req.body.complication

    };

    // Save Donor in the database
    Donor.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the donor."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Donor.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Donor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Donor with id=${id}. Maybe Donor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Donor with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Donor.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Donor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Donor with id=${id}. Maybe Donor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Donor with id=" + id
            });
        });
};

exports.findAll = (req, res) => {

    Donor.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Donors."
            });
        });
};

exports.donorCount = (req, res) => {

    db.sequelize.query('select count(*) as donorCount from donors;', {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving donor count."
            });
        });
}