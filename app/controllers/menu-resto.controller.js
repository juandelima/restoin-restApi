const menu = require('../models/menu-resto.model.js');
const MenuResto = menu.MenuResto;
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const menu = new MenuResto({
        id_resto: req.body.id_resto,
        id_kategori_menu: req.body.id_kategori_menu,
        nama_menu: req.body.nama_menu,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        foto_menu: req.body.foto_menu,
        status_menu: req.body.status_menu,
        is_delete: req.body.is_delete
    });

    MenuResto.create(menu, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the MenuResto."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MenuResto.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving MenuResto."
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
  
    MenuResto.updateById(
      req.params.id_menu,
      new MenuResto(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Menu Resto with id ${req.params.id_menu}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Menu resto with id " + req.params.id_menu
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    MenuResto.remove(req.params.id_menu, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu Resto with id ${req.params.id_menu}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Menu Resto with id " + req.params.id_menu
          });
        }
      } else res.send({ message: `Menu Resto was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MenuResto.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Menu Resto."
        });
      else res.send({ message: `All Menu Resto were deleted successfully!` });
    });
};