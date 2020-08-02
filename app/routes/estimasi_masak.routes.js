module.exports = app => {
    const estimasi = require('../controllers/estimasi_masak.controller.js');
    app.get("/estimasi-masak", estimasi.findAll);
    app.get("/estimasi-masak/:id_user", estimasi.findByIdUser);
    app.put("/estimasi-masak/:id_estimasi", estimasi.updateById)
}