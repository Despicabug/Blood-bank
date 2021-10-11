const db = require('../models');
const Patient = db.patients;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Create a patient
    const patient = {
        name: req.body.name,
        req_id: req.body.req_id,
        address: req.body.address,
        phone: req.body.phone,
        sex: req.body.sex,
        age: req.body.age,
        doctor: req.body.doctor,
        hospital: req.body.hospital
    };

    // Save patient in the database
    Patient.create(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Patient."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Patient.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Patient.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Patient with id=" + id
            });
        });
};

exports.findAll = (req, res) => {

    Patient.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Patients."
            });
        });
};