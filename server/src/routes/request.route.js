const express = require('express');
// const router = express.Router();
const { authJwt } = require('../middleware');

const requestController = require('../controllers/request.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/requests', requestController.findAll);
    app.post('/api/v1/requests', requestController.create);
    app.put('/api/v1/requests/:id', [authJwt.verifyToken], requestController.update);
    app.delete('/api/v1/requests/:id', [authJwt.verifyToken], requestController.delete);
};