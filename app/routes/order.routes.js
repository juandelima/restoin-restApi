module.exports = app => {
    const order = require('../controllers/order.controller.js');
    app.get("/order", order.findAll);
    app.post("/order", order.create);
    app.get("/order/:id_user?/:status?", (req, res) => {
        if(req.params.id_user === 'all' && req.params.status) {
            order.findByStatus(req, res);
        } else {
            order.findByIdUser(req, res);
        }
    });
    app.put("/order/update/:id_order", order.update);
}