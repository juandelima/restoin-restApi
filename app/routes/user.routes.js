module.exports = app => {
    const user = require('../controllers/user.controller.js');
    app.post("/user", user.create);
    app.get("/user", user.findAll);
    app.delete("/user/:id_user", user.delete);
    app.delete("/user", user.deleteAll);
}