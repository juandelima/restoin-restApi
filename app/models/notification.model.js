const sql = require("./db.js");

const Notifikasi = function(notif)  {
    this.id_user = notif.id_user;
    this.id_order = notif.id_order;
    this.info_notif = notif.info_notif;
    this.status = notif.status;
    this.is_deleted = notif.is_deleted;
}

Notifikasi.getAll = result => {
  sql.query(`
    SELECT u.nama_lengkap, m.nama_menu, n.info_notif, n.status, n.created_at FROM notiftbl n 
    INNER JOIN user u on n.id_user = u.id_user 
    INNER JOIN order_menu o on n.id_order = o.id_order 
    INNER JOIN menu_resto m on o.id_menu = m.id_menu ORDER BY id_notif DESC`,
    (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log(`Notifications: `, res);
      result(null, res);
    });
};

Notifikasi.filterByIdUser = (id_user, result) => {
    sql.query(`
      SELECT u.nama_lengkap, m.nama_menu, n.info_notif, n.status, n.created_at FROM notiftbl n 
      INNER JOIN user u on n.id_user = u.id_user 
      INNER JOIN order_menu o on n.id_order = o.id_order 
      INNER JOIN menu_resto m on o.id_menu = m.id_menu 
      WHERE n.id_user = ${id_user} ORDER BY id_notif DESC`,
      (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Notifications by id ${id_user}: `, res);
        result(null, res);
    });
};

Notifikasi.create = newNotif => {
    sql.query("INSERT INTO notiftbl SET ?", newNotif, (err) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      
      console.log({
        "success": "notif successfully created"
      });
    });
};

Notifikasi.updateById = (id_notif, notif, result) => {
    sql.query(`
    UPDATE notiftbl set is_deleted = ? WHERE id_notif = ?
    `,
    [notif.is_deleted, id_notif],
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
  
        console.log("updated order: ", { id_notif: id_notif, ...notif });
        result(null, { id_notif: id_notif, ...order });
      }
    );
};

module.exports = Notifikasi;