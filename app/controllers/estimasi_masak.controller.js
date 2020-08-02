const EstimasiMasakModel = require('../models/estimasi_masak.model.js');
const Notif = require('../models/notification.model.js');
const Order = require('../models/order.model.js');
const EstimasiMasak = EstimasiMasakModel.EstimasiMasak;

exports.findAll = (req, res) => {
    EstimasiMasak.getAll((err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Estimasi Masak."
          });
      } else {
        res.send(data);
      }
    });
};

exports.findByIdUser = (req, res) => {
    EstimasiMasak.filterByIdUser(
        req.params.id_user,
        (err, data) => {
            if (err) {
              res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving Estimasi Masak."
                });
            } else {
              res.send(data);
            }
          }
    );
};

exports.updateById = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    EstimasiMasakModel.findIdOrderByIdEstimasi(req.params.id_estimasi, function(result) {
        const id_order = result.id_order;
        if('timebfrmasak' in req.body && 'timeaftmasak' in req.body) {
            req.body['timebfrmasak'] = req.body['timebfrmasak'];
            req.body['timeaftmasak'] = req.body['timeaftmasak'];
            EstimasiMasak.updateByCookingTime(
                req.params.id_estimasi,
                new EstimasiMasak(req.body),
                (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Not found Estimasi masak with id ${req.params.id_estimasi}.`
                            });
                        } else {
                            res.status(500).send({
                                message: "Error updating Estimasi masak with id " + req.params.id_estimasi
                            });
                        }
                    } else {
                        Order.find_by_id_order(id_order, function(results) {
                            const id_user = results.id_user;
                            const nama_lengkap = results.nama_lengkap;
                            const qty = results.qty;
                            const notification = new Notif({
                                id_user: id_user,
                                id_order: id_order,
                                status: 0,
                                is_deleted: 0,
                                info_notif: `Haiii ${nama_lengkap}, pesanan kamu sebanyak ${qty} sedang disiapkan. Estimasi masak ${req.body['timebfrmasak']} - ${req.body['timeaftmasak']}. Mohon tunggu yaa..Terima kasih :)`
                            });
        
                            Notif.create(notification);
                        });
        
                        res.send(data);
                    }
                }
            );
        }
        
        if('iscooked' in req.body) {
            req.body['iscooked'] = req.body['iscooked'];
            EstimasiMasak.updateByIsCooked(
                req.params.id_estimasi,
                new EstimasiMasak(req.body),
                (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Not found Estimasi masak with id ${req.params.id_estimasi}.`
                            });
                        } else {
                            res.status(500).send({
                                message: "Error updating Estimasi masak with id " + req.params.id_estimasi
                            });
                        }
                    } else {
                        Order.find_by_id_order(id_order, function(results) {
                            const id_user = results.id_user;
                            const nama_lengkap = results.nama_lengkap;
                            const notification = new Notif({
                                id_user: id_user,
                                id_order: id_order,
                                status: 0,
                                is_deleted: 0,
                                info_notif: `Yeayyy, makanan kamu sudah siap dihidangkan..selamat menikmati ${nama_lengkap} ^_^`
                            });
        
                            Notif.create(notification);
                        });
        
                        res.send(data);
                    }
                }
            );
        }

        if (!req.body['timebfrmasak'] && !req.body['timeaftmasak'] && !req.body['iscooked']) {
            res.status(400).send({
                message: `field does not exist`
            });
        }
    });
};