module.exports = app => {
    const kategoriMenu = require('../controllers/kategori-menu.controller.js');
    app.get("/kategori-menu", kategoriMenu.findAll);
    app.post("/kategori-menu", kategoriMenu.create);
    app.put("/kategori-menu/:id_kategori", kategoriMenu.update);
    app.delete("/kategori-menu/:id_kategori", kategoriMenu.delete);
    app.delete("/kategori-menu", kategoriMenu.deleteAll);
}