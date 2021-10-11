const express = require('express');
// const router = express.Router();
const { authJwt } = require('../middleware');

const historyController = require('../controllers/history.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/history', [authJwt.verifyToken], historyController.findAll);
    app.get('/api/v1/history/graph', [authJwt.verifyToken], historyController.graphData);
    app.get('/api/v1/history/graph/:date', [authJwt.verifyToken], historyController.graphDataByDate);
    app.get('/api/v1/history/count', historyController.historyCount);
    app.post('/api/v1/history', [authJwt.verifyToken], historyController.create);
    app.put('/api/v1/history/:id', [authJwt.verifyToken], historyController.update);
    app.delete('/api/v1/history/:id', [authJwt.verifyToken], historyController.delete);
};