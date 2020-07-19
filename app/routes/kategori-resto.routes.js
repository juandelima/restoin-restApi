module.exports = app => {
    const kategoriResto = require('../controllers/kategori-resto.controller.js');
    app.post("/kategori-resto", kategoriResto.create);
    app.get("/kategori-resto", kategoriResto.findAll);
    app.put("/kategori-resto/:id_kategori", kategoriResto.update);
    app.delete("/kategori-resto/:id_kategori", kategoriResto.delete);
    app.delete("/kategori-resto", kategoriResto.deleteAll);
}