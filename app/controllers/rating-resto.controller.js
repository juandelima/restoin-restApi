const RatingResto = require('../models/rating-resto.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const rating = new RatingResto({
        id_rating: req.body.id_rating,
        id_resto: req.body.id_resto,
        id_user: req.body.id_user,
        rating: req.body.rating,
        ulasan: req.body.ulasan
    });

    RatingResto.create(rating, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the RatingResto."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    RatingResto.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving RatingResto."
          });
      } else {
        res.send(data);
      }
    });
};

exports.delete = (req, res) => {
    RatingResto.remove(req.params.id_rating, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rating Resto with id ${req.params.id_rating}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Rating Resto with id " + req.params.id_rating
          });
        }
      } else res.send({ message: `Rating Resto was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    RatingResto.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Rating Resto."
        });
      else res.send({ message: `All Rating Resto were deleted successfully!` });
    });
};