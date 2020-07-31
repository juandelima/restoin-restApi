const sql = require("./db.js");

const Order = function(order) {
    this.id_resto = order.id_resto;
    this.id_user = order.id_user;
    this.id_menu = order.id_menu;
    this.qty = order.qty;
    this.total_harga = order.total_harga;
    this.metode_pembayaran = order.metode_pembayaran;
    this.status = order.status;
};

Order.create = (newOrder, result) => {

    sql.query("INSERT INTO order_menu SET ?", newOrder, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log({
          "success": "order successfully created",
        });
        result(null, {
          "success": "order successfully created",
        });
    });
};

Order.getAll = result => {
  sql.query(`SELECT o.id_order, r.nama_resto, u.nama_lengkap, 
  m.nama_menu, o.qty, o.total_harga, o.metode_pembayaran, o.status, o.created_at, o.updated_at 
  FROM order_menu o INNER JOIN resto r on o.id_resto = r.id_resto INNER JOIN user u on o.id_user = u.id_user 
  INNER JOIN menu_resto m on o.id_menu = m.id_menu ORDER BY id_order DESC`, (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("Orders: ", res);
      result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    `UPDATE order_menu SET id_menu = ?, 
    qty = ?, total_harga = ?, metode_pembayaran = ?, 
    status = ? WHERE id_order = ? `,
    [order.id_menu, order.qty, 
      order.total_harga, order.metode_pembayaran, 
      order.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id_order: id, ...order });
      result(null, { id_order: id, ...order });
    }
  );
};

Order.filterByStatus = (status, result) => {
  sql.query(`SELECT o.id_order, r.nama_resto, u.nama_lengkap, 
  m.nama_menu, o.qty, o.total_harga, o.metode_pembayaran, o.status, o.created_at, o.updated_at 
  FROM order_menu o INNER JOIN resto r on o.id_resto = r.id_resto INNER JOIN user u on o.id_user = u.id_user 
  INNER JOIN menu_resto m on o.id_menu = m.id_menu where o.status = "${status}" ORDER BY id_order DESC`, (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("Orders: ", res);
      result(null, res);
  });
};

Order.filterByIdUser = (id_user, result) => {
  sql.query(`SELECT o.id_order, r.nama_resto, u.nama_lengkap, 
  m.nama_menu, o.qty, o.total_harga, o.metode_pembayaran, o.status, o.created_at, o.updated_at 
  FROM order_menu o INNER JOIN resto r on o.id_resto = r.id_resto INNER JOIN user u on o.id_user = u.id_user 
  INNER JOIN menu_resto m on o.id_menu = m.id_menu where o.id_user = "${id_user}" ORDER BY id_order DESC`, (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("Orders: ", res);
      result(null, res);
  });
};

function get_last_id_order(callback) {
  const query = `SELECT id_order FROM order_menu ORDER BY id_order DESC LIMIT 1`;
  sql.query(query, function(err, result) {
    if (err){ 
        throw err;
    }

    return callback(result[0].id_order);
  });
}


module.exports = {
    Order,
    get_last_id_order
};