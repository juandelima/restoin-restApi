module.exports = app => {
    const resto = require('../controllers/resto.controller.js');
    app.post("/resto", resto.create);
    app.get("/resto", resto.findAll);
    app.put("/resto/:id_resto", resto.update);
    app.delete("/resto/:id_resto", resto.delete);
    app.delete("/resto", resto.deleteAll);
}