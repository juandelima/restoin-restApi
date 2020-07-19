const KategoriMenu = require('../models/kategori-menu.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const kategori = new KategoriMenu({
        id_kategori: req.body.id_kategori,
        nama_kategori: req.body.nama_kategori,
    });

    KategoriMenu.create(kategori, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the KategoriMenu."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    KategoriMenu.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
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
  
    KategoriMenu.updateById(
      req.params.id_kategori,
      new KategoriMenu(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Kategori Menu with id ${req.params.id_kategori}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.id_kategori
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    KategoriMenu.remove(req.params.id_kategori, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Kategori menu with id ${req.params.id_kategori}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Kategori menu with id " + req.params.id_kategori
          });
        }
      } else res.send({ message: `Kategori menu was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    KategoriMenu.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all kategori menu."
        });
      else res.send({ message: `All kategori menu were deleted successfully!` });
    });
};