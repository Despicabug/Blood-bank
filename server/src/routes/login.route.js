const { authJwt } = require('../middleware');

const loginController = require('../controllers/login.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/logins', [authJwt.verifyToken], loginController.findAll);
    app.get('/api/v1/logins/name', [authJwt.verifyToken], loginController.findByName);
};