const HistoryBook = require('../models/history_book.model.js');

exports.findAll = (req, res) => {
    HistoryBook.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving History Booking."
          });
      } else {
        res.send(data);
      }
    });
};

exports.findByIdUserAndStatus = (req, res) => {
    HistoryBook.filterByIdUserAndStatus(
        req.params.id_user,
        req.params.status,
        (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found History Booking with id user: ${req.params.id_user} and status: ${req.params.status}.`
                });
              } else {
                res.status(500).send({
                  message: `Error when searching booking with id user: ${req.params.id_user} and status: ${req.params.status}.`
                });
              }
            } else {
                res.send(data);
            }
        } 
    );
};

exports.findByIdUser = (req, res) => {
    HistoryBook.filterByIdUser(
        req.params.id_user,
        (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found History Booking with id user: ${req.params.id_user}.`
                });
              } else {
                res.status(500).send({
                  message: `Error when searching booking with id user: ${req.params.id_user}.`
                });
              }
            } else {
                res.send(data);
            }
        } 
    );
};

exports.findByStatus = (req, res) => {
   HistoryBook.filterByStatus(
       req.params.status,
       (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found History Booking with status: ${req.params.status}.`
                    });
                } else {
                    res.status(500).send({
                    message: `Error when searching booking with status: ${req.params.status}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
   );
};