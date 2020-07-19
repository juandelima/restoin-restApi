const KategoriResto = require('../models/kategori-resto.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const kategori = new KategoriResto({
        id_kategori: req.body.id_kategori,
        nama_kategori: req.body.nama_kategori,
    });

    KategoriResto.create(kategori, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the KategoriResto."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    KategoriResto.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Kategori Resto."
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
  
    KategoriResto.updateById(
      req.params.id_kategori,
      new KategoriResto(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Kategori Resto with id ${req.params.id_kategori}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Kategori Resto with id " + req.params.id_kategori
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    KategoriResto.remove(req.params.id_kategori, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Kategori Resto with id ${req.params.id_kategori}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Kategori Resto with id " + req.params.id_kategori
          });
        }
      } else res.send({ message: `Kategori Resto was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    KategoriResto.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all kategori Resto."
        });
      else res.send({ message: `All kategori Resto were deleted successfully!` });
    });
};