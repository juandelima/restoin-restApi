module.exports = app => {
    const register = require('../controllers/register.controller.js');
    app.post("/register", register.create);
}