module.exports = app => {
    const booking = require('../controllers/booking.controller.js');
    app.get("/booking", booking.findAll);
    app.post("/booking", booking.create);
    app.get("/booking/:id_user", booking.findByIdUser);
    app.put("/booking/:id_booking", booking.update);
}