const db = require('../models');
const Request = db.requests;

exports.create = (req, res) => {

    // Create a Request
    const request = {
        blood_grp: req.body.blood_grp,
        qty: req.body.qty,
        p_id: req.body.p_id,
        hospital: req.body.hospital
    };

    // Save Request in the database
    Request.create(request)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the request."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Request.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Request was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reqest with id=${id}. Maybe Request was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Request.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Request was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Request with id=" + id + err
            });
        });
};

exports.findAll = (req, res) => {

    Request.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Requests."
            });
        });
};