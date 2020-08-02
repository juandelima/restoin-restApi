const BookingModel = require('../models/booking.model.js');
const HistoryBook = require('../models/history_book.model.js');
const Booking = BookingModel.Booking;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    const booking = new Booking({
        id_user: req.body.id_user,
        jumlah_orang: req.body.jumlah_orang,
        tanggal_book: req.body.tanggal_book,
        jam: req.body.jam,
    });

    Booking.create(booking, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Booking."
            });
        } else {
            BookingModel.get_last_id_booking(function(result) {
                const id_booking = result;

                const history_book = new HistoryBook({
                    id_book: id_booking
                });
                
                HistoryBook.create(history_book, (err, data) => {
                    if(err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the History Book."
                        });
                    } else { 
                        res.send(data);
                    }
                });

                res.send(data);
            });
        }
    });
};

exports.findAll = (req, res) => {
    Booking.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Booking."
          });
      } else {
        res.send(data);
      }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Booking.updateById(
        req.params.id_booking,
        new Booking(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Booking with id ${req.params.id_order}.`
                    });
                } else {
                    res.status(500).send({
                    message: "Error updating Booking with id " + req.params.id_order
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
}

exports.findByIdUser = (req, res) => {
    Booking.filterByIdUser(
        req.params.id_user,
        (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Booking with id user ${req.params.id_user}.`
                });
              } else {
                res.status(500).send({
                  message: "Error when searching booking with id user" + req.params.id_user
                });
              }
            } else {
                res.send(data);
            }
        } 
    )
};

