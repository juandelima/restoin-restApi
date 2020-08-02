module.exports = app => {
    const notif = require('../controllers/notification.controller.js');
    app.get('/notifications', notif.findAll);
    app.get('/notifications/:id_notif', notif.findById);
    app.put('/notification/:id_notif', notif.update);
}