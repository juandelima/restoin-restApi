const HistoryOrder = require('../models/history_order.model.js');

exports.findAll = (req, res) => {
    HistoryOrder.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving History Order."
          });
      } else {
        res.send(data);
      }
    });
};

exports.findByStatusAndPayMethod = (req, res) => {
    req.params.status = req.params.status;
    HistoryOrder.filterByStatusAndPayMethod(
        req.params.payment_method,
        req.params.status,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found History Orders with payment_method: ${req.params.payment_method} and status: ${req.params.status}.`
                });
                } else {
                    res.status(500).send({
                      message: `Error when searching Orders with payment_method: ${req.params.payment_method} and status: ${req.params.status}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
    
};

exports.findByPaymentMethod = (req, res) => {
    HistoryOrder.filterByPaymentMethod(
        req.params.payment_method,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found History Booking with payment_method: ${req.params.payment_method}.`
                    });
                } else {
                    res.status(500).send({
                    message: `Error when searching booking with payment_method: ${req.params.payment_method}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};


exports.findByStatus = (req, res) => {
    HistoryOrder.filterByStatus(
        req.params.status,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found History orders with status: ${req.params.status}.`
                    });
                } else {
                    res.status(500).send({
                    message: `Error when searching orders with status: ${req.params.status}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};