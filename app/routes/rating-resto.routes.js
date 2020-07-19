module.exports = app => {
    const ratingResto = require('../controllers/rating-resto.controller.js');
    app.post("/rating-resto", ratingResto.create);
    app.get("/rating-resto", ratingResto.findAll);
    app.delete("/rating-resto/:id_rating", ratingResto.delete);
    app.delete("/rating-resto", ratingResto.deleteAll);
}