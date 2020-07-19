const Resto = require('../models/resto.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const resto = new Resto({
        id_resto: req.body.id_resto,
        nama_resto: req.body.nama_resto,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        kisaran_harga: req.body.kisaran_harga,
        id_kategori_resto: req.body.id_kategori_resto,
        id_rating: req.body.id_rating,
        alamat: req.body.alamat,
        kontak: req.body.kontak,
        status: req.body.status,
        nama_pemilik: req.body.nama_pemilik
    });

    Resto.create(resto, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Resto."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Resto.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Resto."
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
  
    Resto.updateById(
      req.params.id_resto,
      new Resto(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Resto with id ${req.params.id_resto}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating resto with id " + req.params.id_resto
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    Resto.remove(req.params.id_resto, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Resto with id ${req.params.id_resto}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Resto with id " + req.params.id_resto
          });
        }
      } else res.send({ message: `Resto was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Resto.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Resto."
        });
      else res.send({ message: `All Resto were deleted successfully!` });
    });
};