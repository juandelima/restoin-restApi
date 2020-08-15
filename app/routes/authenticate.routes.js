module.exports = app => {
    const auth = require('../controllers/authenticate.controller.js');
    app.post("/auth-login", auth.login);
    app.post("/auth-logout", auth.logout);
}