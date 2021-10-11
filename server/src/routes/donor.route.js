const express = require('express');
// const router = express.Router();
const { authJwt } = require('../middleware');

const donorController = require('../controllers/donor.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/donors', donorController.findAll);
    app.get('/api/v1/donors/count', donorController.donorCount);
    app.post('/api/v1/donors', donorController.create);
    app.put('/api/v1/donors/:id', [authJwt.verifyToken], donorController.update);
    app.delete('/api/v1/donors/:id', [authJwt.verifyToken], donorController.delete);
};