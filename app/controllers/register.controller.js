const Register = require('../models/register.model.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    const user = new Register({
        foto_profil: req.body.foto_profil,
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email,
        password: cryptr.encrypt(req.body.password),
        no_telepon: req.body.no_telepon,
        role: req.body.role
    });

    Register.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating register the User."
            });
        } else {
            res.send(data);
        }
    });
};