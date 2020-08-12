module.exports = app => {
    const menuResto = require('../controllers/menu-resto.controller.js');
    app.post("/menu-resto", menuResto.create);
    app.get("/menu-resto", menuResto.findAll);
    app.get("/menu-resto/:id_resto", menuResto.findByIdResto);
    app.put("/menu-resto/:id_menu", menuResto.update);
    app.delete("/menu-resto/:id_menu", menuResto.delete);
    app.delete("/menu-resto", menuResto.deleteAll);
}