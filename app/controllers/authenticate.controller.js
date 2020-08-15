const Authenticate = require('../models/authenticate.model.js');
const session = require('express-session');

exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    const auth = new Authenticate({
        email: req.body.email,
        password: req.body.password,
    });

    const email = auth.email;
    const password = auth.password;
    if (email && password) {
        Authenticate.login(
            email,
            password,
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `your account was not found.`
                        });
                    } else {
                        res.status(500).send({
                            message: `Error when searching your account`
                        });
                    }
                } else {
                    if(data['success'] === 'successfully authenticated') {
                        req.session.loggedin = true;
                        req.session.email = email;
                    }
                    res.send(data);
                }
            }
        );
    } else {
        res.send({
            message: "email or password cannot be empty!"
        });
    } 
};

exports.logout = (req, res) => {
    if(req.session.loggedin) {
        req.session.destroy();
        res.status(200).send({
            message: `logged out successfully`
        });
    }
};