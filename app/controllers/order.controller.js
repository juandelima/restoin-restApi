const OrderModel = require('../models/order.model.js');
const MenuResto = require('../models/menu-resto.model.js');
const HistoryOrder = require('../models/history_order.model.js');
const Notif = require('../models/notification.model.js');
const EstimasiMasakModel = require('../models/estimasi_masak.model.js');
const Order = OrderModel.Order;
const EstimasiMasak = EstimasiMasakModel.EstimasiMasak;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const order = new Order({
        id_resto: req.body.id_resto,
        id_user: req.body.id_user,
        id_menu: req.body.id_menu,
        qty: req.body.qty,
        metode_pembayaran: req.body.metode_pembayaran,
        status: req.body.status
    });
    
    const qty = order.qty;
    MenuResto.getHargaMenu(order.id_menu, function(result) {
      if(qty >= 1) {
        const harga_menu = result;
        order.total_harga = harga_menu * qty;
        Order.create(order, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the order."
            });
          } else {
            OrderModel.get_last_id(function(result) {
              const id_order = result.id_order;
              const id_user = result.id_user;
              const nama_lengkap = result.nama_lengkap;
              const nama_menu = result.nama_menu;
              const qty = result.qty;
              const total_harga = result.total_harga;
              const metode_pembayaran = result.metode_pembayaran;

              const notification = new Notif({
                id_user: id_user,
                id_order: id_order,
                info_notif: `Yeay, ada orderan baru nih... ${nama_lengkap} memesan ${nama_menu} sebanyak ${qty}. Total harga ${total_harga}. Bayar menggunakan ${metode_pembayaran}.`,
                status: 0,
                is_deleted: 0,
              });

              const estimasi = new EstimasiMasak({
                id_order: id_order,
                iscooked: 0,
                timebfrmasak: null,
                timeaftmasak: null,
              });

              const history_order = new HistoryOrder({
                id_order: id_order
              });

              Notif.create(notification);

              EstimasiMasak.create(estimasi);

              HistoryOrder.create(history_order);

              res.send(data);
            });
          }
        });
      } else {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Qty cannot be zero!"
          });
        }
      }
    });
};

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err) {
      res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
        });
    } else {
      res.send(data);
    }
  });
};

exports.findByStatus = (req, res) => {
  Order.filterByStatus(
    req.params.status,
    (err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving orders."
          });
      } else {
        res.send(data);
      }
    }
  );
};

exports.findByIdUser =(req, res) => {
  Order.filterByIdUser(
    req.params.id_user,
    (err, data) => {
      if (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving orders."
          });
      } else {
        res.send(data);
      }
    }
  );
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const id_menu = req.body['id_menu'];
  const qty = req.body['qty'];
  MenuResto.getHargaMenu(id_menu, function(result) {
    if(qty >= 1) {
      const harga_menu = result;
      req.body['total_harga'] = harga_menu * qty;
      Order.updateById(
        req.params.id_order,
        new Order(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Order with id ${req.params.id_order}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Order with id " + req.params.id_order
              });
            }
          } else res.send(data);
        }
      );
    } else {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Qty cannot be zero!"
        });
      }
    }
  });
};