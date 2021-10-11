require('dotenv').config();
const db = require('../models');
const bcrypt = require('bcryptjs');
const User = db.users;
const Login = db.logins;

var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
            email: req.body.email,
            username: req.body.username,
            hash: bcrypt.hashSync(req.body.hash, 8)
        })
        .then(user => {
            if (user) {
                return res.status(200).send({ message: "User Added Successfully" })
            }

            throw user;
        }) //See if data should be sents
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.hash,
                user.hash
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            //Log into logins
            // Create a login
            const login = {
                user_id: user.id
            };

            // Save login in the database
            Login.create(login)
                .then(data => {
                    console.log("Logged the data on Logins " + data);
                })
                .catch(err => {
                    console.log("Unable to create log " + err);
                });


            var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });
            //Send a token after confirming credentials
            res.status(200).send({
                token: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};