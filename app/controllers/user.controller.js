const User = require('../models/user.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const user = new User({
        foto_profil: req.body.foto_profil,
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email,
        password: req.body.password,
        no_telepon: req.body.no_telepon,
        role: req.body.role
    });

    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving User."
          });
      } else {
        res.send(data);
      }
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    User.updateById(
      req.params.id_user,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id_user}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id_user
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    User.remove(req.params.id_user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id_user}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id_user
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      else res.send({ message: `All User were deleted successfully!` });
    });
};