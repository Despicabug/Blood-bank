const db = require('../models');
const Inventory = db.inventory;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Create a Inventory
    const inventory = {
        blood_grp: req.body.blood_grp,
        qty: req.body.qty

    };

    // Save Inventory in the database
    Inventory.create(inventory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Inventory."
            });
        });
};

exports.update = (req, res) => {
    const blood_grp = req.params.blood_grp;

    Inventory.update(req.body, {
            where: { blood_grp: blood_grp }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Inventory was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Inventory with blood_grp=${blood_grp}. Maybe Inventory was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Inventory with blood_grp=" + blood_grp
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Inventory.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Inventory was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Inventory with id=" + id
            });
        });
};

exports.findAll = (req, res) => {

    Inventory.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Inventorys."
            });
        });
};