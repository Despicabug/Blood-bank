const express = require('express');
const { authJwt } = require('../middleware');

const patientController = require('../controllers/patient.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/patients', patientController.findAll);
    app.post('/api/v1/patients', patientController.create);
    app.put('/api/v1/patients/:id', [authJwt.verifyToken], patientController.update);
    app.delete('/api/v1/patients/:id', [authJwt.verifyToken], patientController.delete);
};