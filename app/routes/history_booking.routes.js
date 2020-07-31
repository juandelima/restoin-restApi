module.exports = app => {
    const history_book = require('../controllers/history_book.controller.js');
    app.get('/history-booking', history_book.findAll);
    app.get('/history-booking/:id_user?/:status?', (req, res) => {
        if(req.params.id_user !== 'all' && req.params.status) {
            history_book.findByIdUserAndStatus(req, res);
        } else if(req.params.id_user === 'all' && req.params.status) {
            history_book.findByStatus(req, res);
        } else {
            history_book.findByIdUser(req, res)
        }
    });
}