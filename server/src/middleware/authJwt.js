require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.users;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        next();
    });
};


const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;