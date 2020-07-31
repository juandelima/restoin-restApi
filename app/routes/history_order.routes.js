module.exports = app => {
    const history_order = require('../controllers/history_order.controller.js');
    app.get('/history-orders', history_order.findAll);
    app.get('/history-orders/:payment_method?/:status?', (req, res) => {
        if(req.params.payment_method !== 'all' && req.params.status) {
            history_order.findByStatusAndPayMethod(req, res);
        } else if(req.params.payment_method === 'all' && req.params.status) {
            history_order.findByStatus(req, res);
        } else {
            history_order.findByPaymentMethod(req, res);
        }
    });
}