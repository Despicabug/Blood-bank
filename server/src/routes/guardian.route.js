const express = require('express');
// const router = express.Router();
const { authJwt } = require('../middleware');

const guardianController = require('../controllers/guardian.controller');

// router.route('/')
//     .get([authJwt.verifyToken], guardianController.findAll)
//     .post(guardianController.create);

// router.route('/:id')
//     .put([authJwt.verifyToken], guardianController.update)
//     .delete([authJwt.verifyToken], guardianController.delete);

// module.exports = router;

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/v1/guardians/', [authJwt.verifyToken], guardianController.findAll)
    app.get('/api/v1/guardians/:id', guardianController.findByPid);
    app.post('/api/v1/guardians', guardianController.create);
    app.put('/api/v1/guardians/:id', [authJwt.verifyToken], guardianController.update);
    app.delete('/api/v1/guardians/:id', [authJwt.verifyToken], guardianController.delete);
};