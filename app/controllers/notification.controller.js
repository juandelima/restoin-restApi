const Notif = require('../models/notification.model.js');

exports.findAll = (req, res) => {
  Notif.getAll((err, data) => {
    if (err) {
      res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Notif."
        });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  Notif.filterByIdUser(
    req.params.id_notif,
    (err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || `Some error occurred while retrieving Notif by id user: ${req.params.id_notif}.`
          });
      } else {
        res.send(data);
      }
    }
  );
};

exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Notif.updateById(
        req.params.id_notif,
        new Notif(req.body),
        (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found notif with id ${req.params.id_notif}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating notif with id " + req.params.id_notif
                });
              }
            } else res.send(data);
        }
    );
};