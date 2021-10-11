const express = require('express');
// const router = express.Router();
const { authJwt } = require('../middleware');

const inventoryController = require('../controllers/inventory.controller');

// router.route('/')
//     .get([authJwt.verifyToken], inventoryController.findAll)
//     .post([authJwt.verifyToken], inventoryController.create);

// router.route('/:id')
//     .put([authJwt.verifyToken], inventoryController.update)
//     .delete([authJwt.verifyToken], inventoryController.delete);

// module.exports = router;

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/inventory', [authJwt.verifyToken], inventoryController.findAll);
    app.post('/api/v1/inventory', [authJwt.verifyToken], inventoryController.create);
    app.put('/api/v1/inventory/:blood_grp', [authJwt.verifyToken], inventoryController.update);
    app.delete('/api/v1/inventory/:id', [authJwt.verifyToken], inventoryController.delete);
};